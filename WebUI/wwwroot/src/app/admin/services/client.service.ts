import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client.model';
import { API_URL } from "../../../environments/environment";

@Injectable()
export class ClientService {
    clientApi = API_URL + "Client";

    getClients(): Observable<Client[]>{
        return this.http.get<Client[]>(this.clientApi);
    }

    constructor(private http: HttpClient) {}
}