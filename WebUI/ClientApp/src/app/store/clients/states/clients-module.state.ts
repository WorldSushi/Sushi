import { IClientsState, clientsInitialState } from './clients.state';
import { ICallPlanState, callPlanInitialState } from './call-plan.state';
import { ICallsDateState, callsDateInitialState } from './calls-date.state';
import { IManagerCallsResultState, managerCallsResultInitialState } from './manager-calls-result.state';
import { INomenclatureAnalysisState, nomenclatureAnalysisInitialState } from './nomenclature-analysis.state';
import { IRevenueAnalysisState, revenueAnalysisInitialState } from './revenue-analysis.state';
import { ITripPlanState, tripPlanInitialState } from './trip-plan.state';
import { IWeekPlanState, weekPlansInitialState } from './week-plan.state';

export interface IClientsModuleState {
    clientsState: IClientsState,
    callPlanState: ICallPlanState,
    callsDateState: ICallsDateState,
    managerCallsResultState: IManagerCallsResultState,
    nomenclatureAnalysisState: INomenclatureAnalysisState,
    revenueAnalysisState: IRevenueAnalysisState,
    tripPlanState: ITripPlanState,
    weekPlanState: IWeekPlanState
}

export const clientsModuleInitialState = {
    clientsState: clientsInitialState,
    callPlanState: callPlanInitialState,
    callsDateState: callsDateInitialState,
    managerCallsResultState: managerCallsResultInitialState,
    nomenclatureAnalysisState: nomenclatureAnalysisInitialState,
    revenueAnalysisState: revenueAnalysisInitialState,
    tripPlanState: tripPlanInitialState,
    weekPlanState: weekPlansInitialState
}