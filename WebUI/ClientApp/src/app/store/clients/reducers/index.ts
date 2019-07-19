import { ActionReducerMap } from '@ngrx/store';
import { clientsReducer } from './clients.reducer';
import { callPlansReducer } from './call-plan.reducer';
import { IClientsModuleState } from '../states/clients-module.state';
import { callsDatesReducer } from './calls-date.reducer';
import { managerCallsResultsReducer } from './manager-calls-result.reducer';
import { nomenclatureAnalyzesReducer } from './nomenclature-analysis.reducer';
import { revenueAnalyzesReducer } from './revenue-analysis.reducer';
import { tripPlansReducer } from './trip-plan.reducer';
import { weekPlansReducer } from './week-plan.reducer';

export const clientsModuleReducers: ActionReducerMap<IClientsModuleState> = {
    clientsState: clientsReducer,
    callPlanState: callPlansReducer,
    callsDateState: callsDatesReducer,
    managerCallsResultState: managerCallsResultsReducer,
    nomenclatureAnalysisState: nomenclatureAnalyzesReducer,
    revenueAnalysisState: revenueAnalyzesReducer,
    tripPlanState: tripPlansReducer,
    weekPlanState: weekPlansReducer
}