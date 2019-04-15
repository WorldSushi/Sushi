import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonthlyCallPlan } from '../models/mothlyCallPlan.model';

@Injectable()
export class MonthlyCallPlanService {
    monthlyCallPlanApi = "http://localhost:58743/api/MonthlyCallPlan";

    getMonthlyCallPlans(): Observable<MonthlyCallPlan[]> {
        return this.http.get<MonthlyCallPlan[]>(this.monthlyCallPlanApi);
    }

    constructor(private http: HttpClient) {}
}