import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { IClient } from '../models/client.model';
import { ICallsDate } from '../models/calls-date.model';
import { environment } from 'src/environments/environment';


@Injectable()
export class ClientsService {

    API_URL = environment.API_URL + "manager/Client/";
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }

    getClients(managerId: number): Observable<IClient[]>{
        return this.http.get<IClient[]>(this.API_URL);
    }

    createClient(client: IClient): Observable<IClient> {
        return this.http.post<IClient>(this.API_URL, JSON.stringify(client), this.httpOptions);
    }

    editClient(client: IClient): Observable<IClient> {
        return this.http.put<IClient>(this.API_URL, JSON.stringify(client), this.httpOptions);
    }



    constructor(public http: HttpClient){}
}