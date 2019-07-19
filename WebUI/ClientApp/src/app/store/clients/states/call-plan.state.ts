import { ICallPlan } from 'src/app/manager-rm/clients/shared/models/call-plan.model';

export interface ICallPlanState {
    callPlans: ICallPlan[],
    loading: boolean,
    error: any
}

export const callPlanInitialState = {
    callPlans: [],
    error: null,
    loading: false
}
