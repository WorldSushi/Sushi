import { IClientsState, clientsInitialState } from '../clients/states/clients.state';
import { ICallPlanState, callPlanInitialState } from '../clients/states/call-plan.state';
import { ICallsDateState, callsDateInitialState } from '../clients/states/calls-date.state';
import { IManagerCallsResultState, managerCallsResultInitialState } from '../clients/states/manager-calls-result.state';
import { INomenclatureAnalysisState, nomenclatureAnalysisInitialState } from '../clients/states/nomenclature-analysis.state';
import { IRevenueAnalysisState, revenueAnalysisInitialState } from '../clients/states/revenue-analysis.state';
import { ITripPlanState, tripPlanInitialState } from '../clients/states/trip-plan.state';
import { IWeekPlanState, weekPlansInitialState } from '../clients/states/week-plan.state';

export interface IManagerRmState {
    clientsState: IClientsState,
    callPlanState: ICallPlanState,
    callsDateState: ICallsDateState,
    managerCallsResultState: IManagerCallsResultState,
    nomenclatureAnalysisState: INomenclatureAnalysisState,
    revenueAnalysisState: IRevenueAnalysisState,
    tripPlanState: ITripPlanState,
    weekPlanState: IWeekPlanState
}

export const IManagerRmInitialState = {
    clientsState: clientsInitialState,
    callPlanState: callPlanInitialState,
    callsDateState: callsDateInitialState,
    managerCallsResultState: managerCallsResultInitialState,
    nomenclatureAnalysisState: nomenclatureAnalysisInitialState,
    revenueAnalysisState: revenueAnalysisInitialState,
    tripPlanState: tripPlanInitialState,
    weekPlanState: weekPlansInitialState
}