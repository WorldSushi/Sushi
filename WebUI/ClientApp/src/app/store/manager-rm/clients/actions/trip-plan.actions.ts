import { Action } from '@ngrx/store';
import { ITripPlan } from 'src/app/manager-rm/clients/shared/models/trip-plan.model';


export enum TripPlanActionsTypes {
    GET_TRIP_PLANS = '[Clients Page] Get Trip Plans',
    GET_TRIP_PLANS_SUCCESS = '[TripPlan API] Get Trip Plans Success',
    GET_TRIP_PLANS_FAILURE = '[TripPlan API] Get Trip Plans Failure',
    CREATE_TRIP_PLAN = '[Clients Page] Create Trip Plan',
    CREATE_TRIP_PLAN_SUCCESS = '[TripPlan API] Create Trip Plan Success',
    CREATE_TRIP_PLAN_FAILURE = '[TripPlan API] Create Trip Plan Failure',
    EDIT_TRIP_PLAN = '[Clients Page] Edit Trip Plan',
    EDIT_TRIP_PLAN_SUCCESS = '[TripPlan API] Edit Trip Plan Success',
    EDIT_TRIP_PLAN_FAILURE = '[TripPlan API] Edit Trip Plan Failure'
}

export class GetTripPlansAction implements Action {
    readonly type = TripPlanActionsTypes.GET_TRIP_PLANS;

    constructor(public payload: { managerId: number }) { }
}

export class GetTripPlansSuccesAction implements Action {
    readonly type = TripPlanActionsTypes.GET_TRIP_PLANS_SUCCESS;

    constructor(public payload: { tripPlans: ITripPlan[] }) { }
}

export class GetTripPlansFailureAction implements Action {
    readonly type = TripPlanActionsTypes.GET_TRIP_PLANS_FAILURE;

    constructor(public payload: { error: any }) { }
}

export class CreateTripPlanAction implements Action {
    readonly type = TripPlanActionsTypes.CREATE_TRIP_PLAN;

    constructor(public payload: { tripPlan: ITripPlan }){}
}

export class CreateTripPlanSuccesAction implements Action {
    readonly type = TripPlanActionsTypes.CREATE_TRIP_PLAN_SUCCESS;

    constructor(public payload: { tripPlan: ITripPlan }){}
}

export class CreateTripPlanFailureAction implements Action{
    readonly type = TripPlanActionsTypes.CREATE_TRIP_PLAN_FAILURE;

    constructor(public payload: { error: any }){}
}

export class EditTripPlanAction implements Action {
    readonly type = TripPlanActionsTypes.EDIT_TRIP_PLAN;

    constructor(public payload: { tripPlan: ITripPlan }){}
}

export class EditTripPlanSuccesAction implements Action {
    readonly type = TripPlanActionsTypes.EDIT_TRIP_PLAN_SUCCESS;

    constructor(public payload: { tripPlan: ITripPlan }){}
}

export class EditTripPlanFailureAction implements Action {
    readonly type = TripPlanActionsTypes.EDIT_TRIP_PLAN_FAILURE;

    constructor(public payload: { error: any }){}
}

export type TripPlanActionUnion = GetTripPlansAction
    | GetTripPlansSuccesAction
    | GetTripPlansFailureAction
    | CreateTripPlanAction
    | CreateTripPlanSuccesAction
    | CreateTripPlanFailureAction
    | EditTripPlanAction
    | EditTripPlanSuccesAction
    | EditTripPlanFailureAction