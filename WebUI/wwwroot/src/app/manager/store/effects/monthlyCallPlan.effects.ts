import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MonthlyCallPlanService } from '../../services/monthlyCallPlan.service';
import { GetAll, MonthlyCallPlanActionTypes, GetAllSuccess } from '../actions/montlyCallPlan.action';
import { switchMap } from 'rxjs/operators';
import { MonthlyCallPlan } from '../../models/mothlyCallPlan.model';

@Injectable()
export class MonthlyCallPlanEffects {
    @Effect()
    monthlyCallPlans$ = this.actions$.pipe(
        ofType<GetAll>(MonthlyCallPlanActionTypes.GET_ALL),
        switchMap(() => this.monthlyCallPlanService.getMonthlyCallPlans()),
        switchMap((monthlyCallPlans: MonthlyCallPlan[]) => of(new GetAllSuccess({monthlyCallPlans: monthlyCallPlans})))
    )

    constructor(
        private actions$: Actions,
        private monthlyCallPlanService: MonthlyCallPlanService 
    ) {}
}