import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICallsDate } from '../models/calls-date.model';


@Injectable()
export class CallsDatesService {
    API_URL: string = environment.API_URL + "manager/ClientContact/"
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }

    getCallsDates(managerId: number): Observable<ICallsDate[]>{
        return this.http.get<ICallsDate[]>(this.API_URL);
    }

    createCallsDate(callsDate: ICallsDate): Observable<ICallsDate> {
        return this.http.post<ICallsDate>(this.API_URL, callsDate, this.httpOptions);
    }

    editCallsDate(callsDate: ICallsDate): Observable<ICallsDate> {
        return this.http.put<ICallsDate>(this.API_URL + callsDate.id, callsDate, this.httpOptions);
    }


    constructor(public http: HttpClient){}
}