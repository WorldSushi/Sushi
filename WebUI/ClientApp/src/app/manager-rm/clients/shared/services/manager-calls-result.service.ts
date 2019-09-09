import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IManagerCallsResult } from '../models/Manager-calls-result.model';


@Injectable()
export class ManagerCallsResultsService {
    API_URL: string = environment.API_URL + "manager/ClientContactsResult/"
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }

    getManagerCallsResults(managerId: number): Observable<IManagerCallsResult[]>{
      return this.http.get<IManagerCallsResult[]>(this.API_URL + "?date=02.09.2019");
    }

    createManagerCallsResult(managerCallsResult: IManagerCallsResult): Observable<IManagerCallsResult> {
        return this.http.post<IManagerCallsResult>(this.API_URL, managerCallsResult, this.httpOptions);
    }

    editManagerCallsResult(managerCallsResult: IManagerCallsResult): Observable<IManagerCallsResult> {
        return this.http.put<IManagerCallsResult>(this.API_URL + managerCallsResult.id, managerCallsResult, this.httpOptions);
    }


    constructor(public http: HttpClient){}
}
