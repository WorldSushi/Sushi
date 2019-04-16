import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Manager } from '../models/manager.model';

@Injectable()
export class ManagerService {
    userApi =  "http://localhost:58743/api/";

    getManagers(): Observable<Manager[]> {
        return this.http.get<Manager[]>(this.userApi + "User");
    }

    constructor(private http: HttpClient){}
}