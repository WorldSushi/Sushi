import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';
import { GetCallPlansAction, CallPlanActionsTypes, GetCallPlansSuccesAction, GetCallPlansFailureAction, CreateCallPlanAction, CreateCallPlanSuccesAction, CreateCallPlanFailureAction, EditCallPlanAction, EditCallPlanSuccesAction, EditCallPlanFailureAction } from '../actions/call-plan.actions';
import { ICallPlan } from 'src/app/manager-rm/clients/shared/models/call-plan.model';
import { CallPlansService } from 'src/app/manager-rm/clients/shared/services/call-plans.service';


@Injectable()
export class CallPlansEffects {
    @Effect() 
    getCallPlans$ = this.actions$.pipe(
        ofType<GetCallPlansAction>(CallPlanActionsTypes.GET_CALL_PLANS),
        concatMap((action) =>
            this.callPlansService.getCallPlans(action.payload.managerId).pipe(
                map((callPlans: ICallPlan[]) =>
                    new GetCallPlansSuccesAction({ callPlans: callPlans})
                ),
                catchError(error => 
                    of(new GetCallPlansFailureAction({ error: error }))
                )
            )
        )
    )

    @Effect()
    createCallPlan$ = this.actions$.pipe(
        ofType<CreateCallPlanAction>(CallPlanActionsTypes.CREATE_CALL_PLAN),
        concatMap((action) =>
            this.callPlansService.createCallPlan(action.payload.callPlan).pipe(
                map((callPlan: ICallPlan) =>
                    new CreateCallPlanSuccesAction({ callPlan: callPlan })
                ),
                catchError(error => 
                    of(new CreateCallPlanFailureAction({ error: error }))
                )
            )
        )
    )
    
    @Effect()
    editCallPlan$ = this.actions$.pipe(
        ofType<EditCallPlanAction>(CallPlanActionsTypes.EDIT_CALL_PLAN),
        concatMap((action) =>
            this.callPlansService.editCallPlan(action.payload.callPlan).pipe(
                map((callPlan: ICallPlan) =>
                    new EditCallPlanSuccesAction({ callPlan: callPlan}) 
                ),
                catchError(error =>
                    of(new EditCallPlanFailureAction({ error: error}))
                )
            )    
        )
    )

    constructor(
        private callPlansService: CallPlansService,
        private actions$: Actions
    ) {}
}