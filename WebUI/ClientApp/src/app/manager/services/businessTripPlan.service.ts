import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class BusinessTripPlanService {
    businessTripPlanApi = environment.API_URL + "BusinessTripPlan";


    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }

    getBusinessTripPlans(): Observable<any[]> {
        return this.http.get<any[]>(this.businessTripPlanApi);
    }

    createBusinessTripPlan(createCommand): Observable<any> {
        return this.http.post<any>(
            this.businessTripPlanApi,
            createCommand,
            this.httpOptions);
    }

    constructor(private http: HttpClient) {}
}