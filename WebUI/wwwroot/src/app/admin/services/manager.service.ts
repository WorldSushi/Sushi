import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Manager } from '../models/manager.model';
import { API_URL } from '../../../environments/environment';

@Injectable()
export class ManagerService {
    userApi =  API_URL + "User";

    getManagers(): Observable<Manager[]> {
        return this.http.get<Manager[]>(this.userApi);
    }

    constructor(private http: HttpClient){}
}