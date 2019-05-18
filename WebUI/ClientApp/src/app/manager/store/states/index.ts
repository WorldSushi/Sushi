import { IClientState, clientInitialState } from './client.state';
import { IAppState } from '../../../store/states';
import { IMonthlyCallPlanState, monthlyCallPlanInitialState } from './monthlyCallPlan.state';

export interface IManagerState extends IAppState{
    clientState: IClientState,
    monthlyCallPlanState: IMonthlyCallPlanState
}

export const managerIniialState = {
    clientInitialState: clientInitialState,
    monthlyCallPlanInitialState: monthlyCallPlanInitialState
}