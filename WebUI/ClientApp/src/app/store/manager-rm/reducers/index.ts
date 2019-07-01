import { ActionReducerMap } from '@ngrx/store';
import { IManagerRmState } from '../states';
import { clientsReducer } from '../clients/reducers/clients.reducer';
import { callPlansReducer } from '../clients/reducers/call-plan.reducer';
import { callsDatesReducer } from '../clients/reducers/calls-date.reducer';
import { managerCallsResultsReducer } from '../clients/reducers/manager-calls-result.reducer';
import { nomenclatureAnalyzesReducer } from '../clients/reducers/nomenclature-analysis.reducer';
import { revenueAnalyzesReducer } from '../clients/reducers/revenue-analysis.reducer';
import { tripPlansReducer } from '../clients/reducers/trip-plan.reducer';
import { weekPlansReducer } from '../clients/reducers/week-plan.reducer';

export const managerRmReducers: ActionReducerMap<IManagerRmState> = {
    clientsState: clientsReducer,
    callPlanState: callPlansReducer,
    callsDateState: callsDatesReducer,
    managerCallsResultState: managerCallsResultsReducer,
    nomenclatureAnalysisState: nomenclatureAnalyzesReducer,
    revenueAnalysisState: revenueAnalyzesReducer,
    tripPlanState: tripPlansReducer,
    weekPlanState: weekPlansReducer
}