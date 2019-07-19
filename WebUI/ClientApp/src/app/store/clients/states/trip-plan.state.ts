import { ITripPlan } from 'src/app/manager-rm/clients/shared/models/trip-plan.model';

export interface ITripPlanState {
    tripPlans: ITripPlan[],
    loading: boolean,
    error: any
}

export const tripPlanInitialState = {
    tripPlans: [],
    error: null,
    loading: false
}