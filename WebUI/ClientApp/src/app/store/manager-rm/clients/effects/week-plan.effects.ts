import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';
import { GetWeekPlansAction, WeekPlanActionsTypes, GetWeekPlansSuccesAction, GetWeekPlansFailureAction, CreateWeekPlanAction, CreateWeekPlanSuccesAction, CreateWeekPlanFailureAction, EditWeekPlanAction, EditWeekPlanSuccesAction, EditWeekPlanFailureAction, AddFactToWeekPlanAction, AddFactToPlanFailureAction } from '../actions/week-plan.actions';
import { IWeekPlan } from 'src/app/manager-rm/clients/shared/models/week-plan.model';
import { WeekPlansService } from 'src/app/manager-rm/clients/shared/services/week-plan.service';


@Injectable()
export class WeekPlansEffects {
    @Effect() 
    getWeekPlans$ = this.actions$.pipe(
        ofType<GetWeekPlansAction>(WeekPlanActionsTypes.GET_WEEK_PLANS),
        concatMap((action) =>
            this.weekPlansService.getWeekPlans(action.payload.managerId).pipe(
                map((weekPlans: IWeekPlan[]) =>
                    new GetWeekPlansSuccesAction({ weekPlans: weekPlans})
                ),
                catchError(error => 
                    of(new GetWeekPlansFailureAction({ error: error }))
                )
            )
        )
    )

    @Effect()
    createWeekPlan$ = this.actions$.pipe(
        ofType<CreateWeekPlanAction>(WeekPlanActionsTypes.CREATE_WEEK_PLAN),
        concatMap((action) =>
            this.weekPlansService.createWeekPlan(action.payload.weekPlan).pipe(
                map((weekPlan: IWeekPlan) =>
                    new CreateWeekPlanSuccesAction({ weekPlan: weekPlan })
                ),
                catchError(error => 
                    of(new CreateWeekPlanFailureAction({ error: error }))
                )
            )
        )
    )
    
    @Effect()
    editWeekPlan$ = this.actions$.pipe(
        ofType<EditWeekPlanAction>(WeekPlanActionsTypes.EDIT_WEEK_PLAN),
        concatMap((action) =>
            this.weekPlansService.editWeekPlan(action.payload.weekPlan).pipe(
                map((weekPlan: IWeekPlan) =>
                    new EditWeekPlanSuccesAction({ weekPlan: weekPlan}) 
                ),
                catchError(error =>
                    of(new EditWeekPlanFailureAction({ error: error}))
                )
            )    
        )
    )

    @Effect()
    addFactToWeekPlan$ = this.actions$.pipe(
        ofType<AddFactToWeekPlanAction>(WeekPlanActionsTypes.ADD_FACT_TO_WEEK_PLAN),
        concatMap((action) =>
            this.weekPlansService.addFactToWeekPlan(action.payload.weekPlan).pipe(
                map((weekPlan: IWeekPlan) =>
                    new EditWeekPlanSuccesAction({ weekPlan: weekPlan}) 
                ),
                catchError(error =>
                    of(new AddFactToPlanFailureAction({ error: error}))
                )
            )    
        )
    )
                    
    
    constructor(
        private weekPlansService: WeekPlansService,
        private actions$: Actions
    ) {}
}