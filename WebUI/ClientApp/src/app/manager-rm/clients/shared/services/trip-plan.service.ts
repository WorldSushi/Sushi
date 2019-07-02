import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITripPlan } from '../models/trip-plan.model';


@Injectable()
export class TripPlansService {
    API_URL: string = environment.API_URL + "manager/BusinessTripPlan/"
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }

    getTripPlans(managerId: number): Observable<ITripPlan[]>{
        return this.http.get<ITripPlan[]>(this.API_URL);
    }

    createTripPlan(tripPlan: ITripPlan): Observable<ITripPlan> {
        return this.http.post<ITripPlan>(this.API_URL, tripPlan, this.httpOptions);
    }

    editTripPlan(tripPlan: ITripPlan): Observable<ITripPlan> {
        return this.http.put<ITripPlan>(this.API_URL + tripPlan.id, tripPlan, this.httpOptions);
    }


    constructor(public http: HttpClient){}
}