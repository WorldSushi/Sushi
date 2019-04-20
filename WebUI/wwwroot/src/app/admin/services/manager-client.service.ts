import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../models/client.model';
import { API_URL } from "../../../environments/environment";

@Injectable()
export class ManagerClientService {
    clientApi = API_URL + "ManagerClient";
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }

    bindManagers(clientId: number, managerIds: any[]): Observable<any>{
        return this.http.post<any>(this.clientApi, { clientId: clientId, managerIds: managerIds}, this.httpOptions );
    }


    constructor(private http: HttpClient) {}
}