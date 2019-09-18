import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { IClient } from '../models/client.model';
import { ICallsDate } from '../models/calls-date.model';
import { environment } from 'src/environments/environment';


@Injectable()
export class ClientsService {

    MANAGER_API_URL = environment.API_URL + "manager/Client/";
    ADMIN_API_URL = environment.API_URL + "admin/Client";
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }

    getManagerClients(managerId: number): Observable<IClient[]>{
        return this.http.get<IClient[]>(this.MANAGER_API_URL);
    }

    getAdminClients(): Observable<IClient[]>{
        return this.http.get<IClient[]>(this.ADMIN_API_URL);
    }

    createClient(client: IClient): Observable<IClient> {
        return this.http.post<IClient>(this.MANAGER_API_URL, JSON.stringify(client), this.httpOptions);
    }

    adminCreateClient(client: IClient): Observable<IClient> {
        return this.http.post<IClient>(this.ADMIN_API_URL, JSON.stringify(client), this.httpOptions);
    }

    editClient(client: IClient): Observable<IClient> {
        return this.http.put<IClient>(this.MANAGER_API_URL, JSON.stringify(client), this.httpOptions);
    }

    adminEditClient(client: IClient): Observable<IClient> {
        return this.http.put<IClient>(this.ADMIN_API_URL, JSON.stringify(client), this.httpOptions);
    }



    constructor(public http: HttpClient){}
}