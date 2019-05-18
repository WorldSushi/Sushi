import { Client } from '../models/client.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class CLientService {
    clientApi = environment.API_URL + "ClientForManager";

    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.clientApi);
    }
    
    constructor(private http: HttpClient){}
}