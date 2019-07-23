import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IWorkgroup } from '../models/workgroup.model';

@Injectable()
export class WorkgroupService {
    WORKGROUP_API_URL = environment.API_URL + "admin/Workgroup/";
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }

    getWorkgroups(): Observable<IWorkgroup[]>{
        return this.http.get<IWorkgroup[]>(this.WORKGROUP_API_URL);
    }

    createWorkgroup(workgroup: IWorkgroup): Observable<IWorkgroup> {
        return this.http.post<IWorkgroup>(this.WORKGROUP_API_URL, JSON.stringify(workgroup), this.httpOptions);
    }

    editWorkgroup(workgroup: IWorkgroup): Observable<IWorkgroup> {
        return this.http.put<IWorkgroup>(this.WORKGROUP_API_URL, JSON.stringify(workgroup), this.httpOptions);
    }

    addClientToWorkgroup(data) {
        return this.http.put<IWorkgroup>(this.WORKGROUP_API_URL + 'BindClient', JSON.stringify(data), this.httpOptions);
    }

    changeRegionalManager(data) {
        return this.http.put<IWorkgroup>(this.WORKGROUP_API_URL + 'ChangeRegionalManager', JSON.stringify(data), this.httpOptions);
    }

    changeEscortManager(data) {
        return this.http.put<IWorkgroup>(this.WORKGROUP_API_URL + 'ChangeEscortManager', JSON.stringify(data), this.httpOptions);
    }


    constructor(public http: HttpClient){}
}