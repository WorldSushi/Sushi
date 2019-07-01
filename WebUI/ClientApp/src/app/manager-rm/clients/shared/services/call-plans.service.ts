import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { ICallPlan } from "../models/call-plan.model";
import { environment } from 'src/environments/environment';


@Injectable()
export class CallPlansService {
    API_URL: string = environment.API_URL + "CallPlan/"
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }

    getCallPlans(managerId: number): Observable<ICallPlan[]>{
        return this.http.get<ICallPlan[]>(this.API_URL + managerId);
    }

    createCallPlan(callPlan: ICallPlan): Observable<ICallPlan> {
        return this.http.post<ICallPlan>(this.API_URL, callPlan, this.httpOptions);
    }

    editCallPlan(callPlan: ICallPlan): Observable<ICallPlan> {
        return this.http.put<ICallPlan>(this.API_URL + callPlan.id, callPlan, this.httpOptions);
    }


    constructor(public http: HttpClient){}
}