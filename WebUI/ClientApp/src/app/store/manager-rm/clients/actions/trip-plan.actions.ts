import { Action } from '@ngrx/store';
import { ITripPlan } from 'src/app/manager-rm/clients/shared/models/trip-plan.model';


export enum TripPlanActionsTypes {
    GET_TRIP_PLANS = '[Clients Page] Get Trip Plans',
    GET_TRIP_PLANS_SUCCESS = '[TripPlan API] Get Trip Plans Success',
    GET_TRIP_PLANS_FAILURE = '[TripPlan API] Get Trip Plans Failure',
    CREATE_TRIP_PLAN = '[Clients Page] Create Trip Plan',
    CREATE_TRIP_PLAN_SUCCESS = '[TripPlan API] Create Trip Plan Success',
    CREATE_TRIP_PLAN_FAILURE = '[TripPlan API] Create Trip Plan Failure',
    EDIT_TRIP_PLAN_HOURS = '[Clients Page] Edit Trip Plan Hours',
    EDIT_TRIP_PLAN_HOURS_SUCCESS = '[TripPlan API] Edit Trip Plan Hours Success',
    EDIT_TRIP_PLAN_HOURS_FAILURE = '[TripPlan API] Edit Trip Plan Hours Failure',
    EDIT_TRIP_PLAN_COMPLETED_TYPE = '[Clients Page] Edit Trip Plan Completed Type',
    EDIT_TRIP_PLAN_COMPLETED_TYPE_SUCCESS = '[TripPlan API] Edit Trip Plan Completed Type Success',
    EDIT_TRIP_PLAN_COMPLETED_TYPE_FAILURE = '[TripPlan API] Edit Trip Plan Completed Type Failure'
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

export class EditTripPlanHoursAction implements Action {
    readonly type = TripPlanActionsTypes.EDIT_TRIP_PLAN_HOURS;

    constructor(public payload: { tripPlan: ITripPlan }){}
}

export class EditTripPlanHoursSuccesAction implements Action {
    readonly type = TripPlanActionsTypes.EDIT_TRIP_PLAN_HOURS_SUCCESS;

    constructor(public payload: { tripPlan: ITripPlan }){}
}

export class EditTripPlanHoursFailureAction implements Action {
    readonly type = TripPlanActionsTypes.EDIT_TRIP_PLAN_HOURS_FAILURE;

    constructor(public payload: { error: any }){}
}

export class EditTripPlanCompletedTypeAction implements Action {
    readonly type = TripPlanActionsTypes.EDIT_TRIP_PLAN_COMPLETED_TYPE;

    constructor(public payload: { tripPlan: ITripPlan }){}
}

export class EditTripPlanCompletedTypeSuccesAction implements Action {
    readonly type = TripPlanActionsTypes.EDIT_TRIP_PLAN_COMPLETED_TYPE_SUCCESS;

    constructor(public payload: { tripPlan: ITripPlan }){}
}

export class EditTripPlanCompletedTypeFailureAction implements Action {
    readonly type = TripPlanActionsTypes.EDIT_TRIP_PLAN_COMPLETED_TYPE_FAILURE;

    constructor(public payload: { error: any }){}
}

export type TripPlanActionUnion = GetTripPlansAction
    | GetTripPlansSuccesAction
    | GetTripPlansFailureAction
    | CreateTripPlanAction
    | CreateTripPlanSuccesAction
    | CreateTripPlanFailureAction
    | EditTripPlanHoursAction
    | EditTripPlanHoursSuccesAction
    | EditTripPlanHoursFailureAction
    | EditTripPlanCompletedTypeAction
    | EditTripPlanCompletedTypeSuccesAction
    | EditTripPlanCompletedTypeFailureAction