import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';
import { GetTripPlansAction, TripPlanActionsTypes, GetTripPlansSuccesAction, GetTripPlansFailureAction, CreateTripPlanAction, CreateTripPlanSuccesAction, CreateTripPlanFailureAction, EditTripPlanAction, EditTripPlanSuccesAction, EditTripPlanFailureAction } from '../actions/trip-plan.actions';
import { ITripPlan } from 'src/app/manager-rm/clients/shared/models/trip-plan.model';
import { TripPlansService } from 'src/app/manager-rm/clients/shared/services/trip-plan.service';



@Injectable()
export class TripPlansEffects {
    @Effect() 
    getTripPlans$ = this.actions$.pipe(
        ofType<GetTripPlansAction>(TripPlanActionsTypes.GET_TRIP_PLANS),
        concatMap((action) =>
            this.tripPlansService.getTripPlans(action.payload.managerId).pipe(
                map((tripPlans: ITripPlan[]) =>
                    new GetTripPlansSuccesAction({ tripPlans: tripPlans})
                ),
                catchError(error => 
                    of(new GetTripPlansFailureAction({ error: error }))
                )
            )
        )
    )

    @Effect()
    createTripPlan$ = this.actions$.pipe(
        ofType<CreateTripPlanAction>(TripPlanActionsTypes.CREATE_TRIP_PLAN),
        concatMap((action) =>
            this.tripPlansService.createTripPlan(action.payload.tripPlan).pipe(
                map((tripPlan: ITripPlan) =>
                    new CreateTripPlanSuccesAction({ tripPlan: tripPlan })
                ),
                catchError(error => 
                    of(new CreateTripPlanFailureAction({ error: error }))
                )
            )
        )
    )
    
    @Effect()
    editTripPlan$ = this.actions$.pipe(
        ofType<EditTripPlanAction>(TripPlanActionsTypes.EDIT_TRIP_PLAN),
        concatMap((action) =>
            this.tripPlansService.editTripPlan(action.payload.tripPlan).pipe(
                map((tripPlan: ITripPlan) =>
                    new EditTripPlanSuccesAction({ tripPlan: tripPlan}) 
                ),
                catchError(error =>
                    of(new EditTripPlanFailureAction({ error: error}))
                )
            )    
        )
    )

    constructor(
        private tripPlansService: TripPlansService,
        private actions$: Actions
    ) {}
}