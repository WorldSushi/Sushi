import { Action } from '@ngrx/store';
import { ICallPlan } from 'src/app/manager-rm/clients/shared/models/call-plan.model';


export enum CallPlanActionsTypes {
    GET_CALL_PLANS = '[Clients Page] Get Call Plans',
    GET_CALL_PLANS_SUCCESS = '[CallPlan API] Get Call Plans Success',
    GET_CALL_PLANS_FAILURE = '[CallPlan API] Get Call Plans Failure',
    CREATE_CALL_PLAN = '[Clients Page] Create Call Plan',
    CREATE_CALL_PLAN_SUCCESS = '[CallPlan API] Create Call Plan Success',
    CREATE_CALL_PLAN_FAILURE = '[CallPlan API] Create Call Plan Failure',
    EDIT_CALL_PLAN = '[Clients Page] Edit Call Plan',
    EDIT_CALL_PLAN_SUCCESS = '[CallPlan API] Edit Call Plan Success',
    EDIT_CALL_PLAN_FAILURE = '[CallPlan API] Edit Call Plan Failure'
}

export class GetCallPlansAction implements Action {
    readonly type = CallPlanActionsTypes.GET_CALL_PLANS;

    constructor(public payload: { managerId: number }) { }
}

export class GetCallPlansSuccesAction implements Action {
    readonly type = CallPlanActionsTypes.GET_CALL_PLANS_SUCCESS;

    constructor(public payload: { callPlans: ICallPlan[] }) { }
}

export class GetCallPlansFailureAction implements Action {
    readonly type = CallPlanActionsTypes.GET_CALL_PLANS_FAILURE;

    constructor(public payload: { error: any }) { }
}

export class CreateCallPlanAction implements Action {
    readonly type = CallPlanActionsTypes.CREATE_CALL_PLAN;

    constructor(public payload: { callPlan: ICallPlan }){}
}

export class CreateCallPlanSuccesAction implements Action {
    readonly type = CallPlanActionsTypes.CREATE_CALL_PLAN_SUCCESS;

    constructor(public payload: { callPlan: ICallPlan }){}
}

export class CreateCallPlanFailureAction implements Action{
    readonly type = CallPlanActionsTypes.CREATE_CALL_PLAN_FAILURE;

    constructor(public payload: { error: any }){}
}

export class EditCallPlanAction implements Action {
    readonly type = CallPlanActionsTypes.EDIT_CALL_PLAN;

    constructor(public payload: { callPlan: ICallPlan }){}
}

export class EditCallPlanSuccesAction implements Action {
    readonly type = CallPlanActionsTypes.EDIT_CALL_PLAN_SUCCESS;

    constructor(public payload: { callPlan: ICallPlan }){}
}

export class EditCallPlanFailureAction implements Action {
    readonly type = CallPlanActionsTypes.EDIT_CALL_PLAN_FAILURE;

    constructor(public payload: { error: any }){}
}

export type CallPlanActionUnion = GetCallPlansAction
    | GetCallPlansSuccesAction
    | GetCallPlansFailureAction
    | CreateCallPlanAction
    | CreateCallPlanSuccesAction
    | CreateCallPlanFailureAction
    | EditCallPlanAction
    | EditCallPlanSuccesAction
    | EditCallPlanFailureAction