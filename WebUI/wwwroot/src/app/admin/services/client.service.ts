import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client.model';

@Injectable()
export class ClientService {
    clientApi = "http://localhost:58743/api/Client";

    getClients(): Observable<Client[]>{
        return this.http.get<Client[]>(this.clientApi);
    }

    constructor(private http: HttpClient) {}
}