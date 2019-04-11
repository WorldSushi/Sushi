import { Client } from '../models/client.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CLientService {
    clientApi = "http://localhost:59295/api/Client";

    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.clientApi);
    }

    constructor(private http: HttpClient){}
}