import { Action } from '@ngrx/store';
import { IWeekPlan } from 'src/app/manager-rm/clients/shared/models/week-plan.model';



export enum WeekPlanActionsTypes {
    GET_WEEK_PLANS = '[Clients Page] Get Week Plans',
    GET_WEEK_PLANS_SUCCESS = '[WeekPlan API] Get Week Plans Success',
    GET_WEEK_PLANS_FAILURE = '[WeekPlan API] Get Week Plans Failure',
    CREATE_WEEK_PLAN = '[Clients Page] Create Week Plan',
    CREATE_WEEK_PLAN_SUCCESS = '[WeekPlan API] Create Week Plan Success',
    CREATE_WEEK_PLAN_FAILURE = '[WeekPlan API] Create Week Plan Failure',
    EDIT_WEEK_PLAN = '[Clients Page] Edit Week Plan',
    EDIT_WEEK_PLAN_SUCCESS = '[WeekPlan API] Edit Week Plan Success',
    EDIT_WEEK_PLAN_FAILURE = '[WeekPlan API] Edit Week Plan Failure'
}

export class GetWeekPlansAction implements Action {
    readonly type = WeekPlanActionsTypes.GET_WEEK_PLANS;

    constructor(public payload: { managerId: number }) { }
}

export class GetWeekPlansSuccesAction implements Action {
    readonly type = WeekPlanActionsTypes.GET_WEEK_PLANS_SUCCESS;

    constructor(public payload: { weekPlans: IWeekPlan[] }) { }
}

export class GetWeekPlansFailureAction implements Action {
    readonly type = WeekPlanActionsTypes.GET_WEEK_PLANS_FAILURE;

    constructor(public payload: { error: any }) { }
}

export class CreateWeekPlanAction implements Action {
    readonly type = WeekPlanActionsTypes.CREATE_WEEK_PLAN;

    constructor(public payload: { weekPlan: IWeekPlan }){}
}

export class CreateWeekPlanSuccesAction implements Action {
    readonly type = WeekPlanActionsTypes.CREATE_WEEK_PLAN_SUCCESS;

    constructor(public payload: { weekPlan: IWeekPlan }){}
}

export class CreateWeekPlanFailureAction implements Action{
    readonly type = WeekPlanActionsTypes.CREATE_WEEK_PLAN_FAILURE;

    constructor(public payload: { error: any }){}
}

export class EditWeekPlanAction implements Action {
    readonly type = WeekPlanActionsTypes.EDIT_WEEK_PLAN;

    constructor(public payload: { weekPlan: IWeekPlan }){}
}

export class EditWeekPlanSuccesAction implements Action {
    readonly type = WeekPlanActionsTypes.EDIT_WEEK_PLAN_SUCCESS;

    constructor(public payload: { weekPlan: IWeekPlan }){}
}

export class EditWeekPlanFailureAction implements Action {
    readonly type = WeekPlanActionsTypes.EDIT_WEEK_PLAN_FAILURE;

    constructor(public payload: { error: any }){}
}

export type WeekPlanActionUnion = GetWeekPlansAction
    | GetWeekPlansSuccesAction
    | GetWeekPlansFailureAction
    | CreateWeekPlanAction
    | CreateWeekPlanSuccesAction
    | CreateWeekPlanFailureAction
    | EditWeekPlanAction
    | EditWeekPlanSuccesAction
    | EditWeekPlanFailureAction