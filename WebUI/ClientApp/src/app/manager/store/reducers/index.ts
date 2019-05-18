import { IManagerState } from '../states';
import { clientReducer } from './client.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { monthlyCallPlanReducer } from './monthlyCallPlan.reducer';

export const managerReducer: ActionReducerMap<IManagerState, any> = {
    clientState: clientReducer,
    monthlyCallPlanState: monthlyCallPlanReducer
}