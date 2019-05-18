import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Manager } from '../models/manager.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ManagerService {
    private managerApi = environment.API_URL + 'Manager';

    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }

    getManagers(): Observable<Manager[]> {
        return this.http.get<Manager[]>(this.managerApi);
    }

    createManager(manager: Manager): Observable<Manager> {
        return this.http.post<Manager>(this.managerApi, manager, this.httpOptions);
    }

    updateManager(manager: Manager): Observable<Manager> {
        return this.http.put<Manager>(this.managerApi + "/" + manager.id, manager, this.httpOptions)
    }

    deleteManager(managerId: number): Observable<number> {
        return this.http.delete<number>(this.managerApi + '/' + managerId, this.httpOptions)
    }

    constructor(private http: HttpClient){}
}