import { Action } from '@ngrx/store';
import { MonthlyCallPlan } from '../../models/mothlyCallPlan.model';

export enum MonthlyCallPlanActionTypes {
    GET_ALL = '[MonthlyCallPlan] GET_ALL',
    GET_ALL_SUCCESS = '[MonthlyCallPlan] GET_ALL_SUCCESS',
    GET_ALL_FAILURE = '[MonthlyCallPlan] GET_ALL_FAILURE'
};

export class GetAllMonthyCallPlans implements Action {
    readonly type = MonthlyCallPlanActionTypes.GET_ALL;

    constructor() { }
}

export class GetAllSuccess implements Action {
    readonly type = MonthlyCallPlanActionTypes.GET_ALL_SUCCESS;

    constructor(public payload: {monthlyCallPlans: MonthlyCallPlan[]}) { }
}

export class GetAllFailure implements Action {
    readonly type = MonthlyCallPlanActionTypes.GET_ALL_FAILURE;

    constructor(public payload: {error: string}) { }
}

export type MonthlyCallPlanActions = GetAllMonthyCallPlans | GetAllSuccess | GetAllFailure;
