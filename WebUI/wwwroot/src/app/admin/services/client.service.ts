import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../models/client.model';
import { API_URL } from "../../../environments/environment";

@Injectable()
export class ClientService {
<<<<<<< HEAD
    clientApi = API_URL + "Client";
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }
=======
    clientApi = API_URL + "ClientForAdmin";
>>>>>>> origin/master

    getClients(): Observable<Client[]>{
        return this.http.get<Client[]>(this.clientApi);
    }

    createClient(client: Client): Observable<Client> {
        return this.http.post<Client>(this.clientApi, client, this.httpOptions);
    }

    updateClient(client: Client): Observable<Client> {
        return this.http.put<Client>(this.clientApi, client, this.httpOptions)
    }

    deleteClient(clientId: number): Observable<number> {
        return this.http.delete<number>(this.clientApi + '/' + clientId, this.httpOptions)
    }

    constructor(private http: HttpClient) {}
}