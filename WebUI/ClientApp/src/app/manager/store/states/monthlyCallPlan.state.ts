import { MonthlyCallPlan } from '../../models/mothlyCallPlan.model';

export interface IMonthlyCallPlanState {
    monthlyCallPlans: MonthlyCallPlan[],
    loading: boolean,
    error: string
}

export const monthlyCallPlanInitialState: IMonthlyCallPlanState = {
    monthlyCallPlans: [],
    loading: false,
    error: null
}