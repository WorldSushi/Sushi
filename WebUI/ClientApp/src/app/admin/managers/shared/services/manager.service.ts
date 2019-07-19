import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IManager } from '../models/manager.model';


@Injectable()
export class ManagerService {

    MANAGER_API_URL = environment.API_URL + "admin/Manager/";
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }

    getManagers(): Observable<IManager[]>{
        return this.http.get<IManager[]>(this.MANAGER_API_URL);
    }

    createManager(client: IManager): Observable<IManager> {
        return this.http.post<IManager>(this.MANAGER_API_URL, JSON.stringify(client), this.httpOptions);
    }

    editManager(client: IManager): Observable<IManager> {
        return this.http.put<IManager>(this.MANAGER_API_URL, JSON.stringify(client), this.httpOptions);
    }



    constructor(public http: HttpClient){}
}