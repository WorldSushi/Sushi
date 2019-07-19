import { IWeekPlan } from 'src/app/manager-rm/clients/shared/models/week-plan.model';

export interface IWeekPlanState {
    weekPlans: IWeekPlan[],
    loading: boolean,
    error: any
}

export const weekPlansInitialState = {
    weekPlans: [],
    error: null,
    loading: false
}