import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IWeekPlan } from '../models/week-plan.model';


@Injectable()
export class WeekPlansService {
    API_URL: string = environment.API_URL + "manager/WeekPlan/"
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }

    getWeekPlans(managerId: number): Observable<IWeekPlan[]>{
        return this.http.get<IWeekPlan[]>(this.API_URL);
    }

    createWeekPlan(weekPlan: IWeekPlan): Observable<IWeekPlan> {
        return this.http.post<IWeekPlan>(this.API_URL, weekPlan, this.httpOptions);
    }

    editWeekPlan(weekPlan: IWeekPlan): Observable<IWeekPlan> {
        return this.http.put<IWeekPlan>(this.API_URL + weekPlan.id, weekPlan, this.httpOptions);
    }

    addFactToWeekPlan(weekPlan: IWeekPlan): Observable<IWeekPlan> {
        return this.http.put<IWeekPlan>(this.API_URL + 'AddFact', weekPlan, this.httpOptions)
    }


    constructor(public http: HttpClient){}
}