import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonthlyCallPlan } from '../models/mothlyCallPlan.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MonthlyCallPlanService {
    monthlyCallPlanApi = "http://localhost:58743/api/MonthlyCallPlan";
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }

    getMonthlyCallPlans(): Observable<MonthlyCallPlan[]> {
        return this.http.get<MonthlyCallPlan[]>(this.monthlyCallPlanApi);
    }

    createMonthlyCallPlan(createCommand): Observable<MonthlyCallPlan> {
        console.log(createCommand);
        return this.http.post<MonthlyCallPlan>(
            this.monthlyCallPlanApi,
            createCommand,
            this.httpOptions);
    }

    constructor(private http: HttpClient) {}
}