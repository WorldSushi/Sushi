import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class WeekPlanService {
    clientApi = environment.API_URL + "WeekPlan";

    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }

    createWeekPlans(newWeekPlans): Observable<any> {
        return this.http.post<any>(this.clientApi, newWeekPlans, this.httpOptions);
    }

    putWeekPlan(weekPlan): Observable<any>{
        return this.http.put<any>(this.clientApi, weekPlan, this.httpOptions);
    }
    
    constructor(private http: HttpClient){}
}