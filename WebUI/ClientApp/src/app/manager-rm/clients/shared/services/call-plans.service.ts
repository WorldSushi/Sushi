import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { ICallPlan } from "../models/call-plan.model";


@Injectable()
export class CallPlansService {

    testData = JSON.stringify([
        { id: 1, collective: 10, MS: 7, RM: 3, clientId: 1 },
        { id: 1, collective: 5, MS: 2, RM: 3, clientId: 2 },
    ]);

    getCallPlans(managerId: number): Observable<ICallPlan[]>{
        const result = JSON.parse(this.testData);
        return of(result);
    }

    createCallPlan(callPlan: ICallPlan): Observable<ICallPlan> {
        let callPlans: ICallPlan[] = JSON.parse(this.testData);

        callPlan.id = callPlans.length + 1;

        callPlans = [...callPlans, callPlan];

        this.testData = JSON.stringify(callPlans);

        return of(callPlan);
    }

    editClient(callPlan: ICallPlan): Observable<ICallPlan> {
        let callPlans: ICallPlan[] = JSON.parse(this.testData);

        let indexOfEditingCallPlan= callPlans.findIndex(item => item.id == callPlan.id);

        callPlans = [
            ...callPlans.slice(0, indexOfEditingCallPlan),
            callPlan,
            ...callPlans.slice(indexOfEditingCallPlan + 1)
        ];

        this.testData = JSON.stringify(callPlans);

        return of(callPlan);
    }


    constructor(public http: HttpClient){}
}