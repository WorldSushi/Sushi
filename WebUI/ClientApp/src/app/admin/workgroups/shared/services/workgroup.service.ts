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



    constructor(public http: HttpClient){}
}