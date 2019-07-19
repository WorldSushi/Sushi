import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IClientsModuleState } from '../states/clients-module.state';


export const selectClientsModuleState = createFeatureSelector<IClientsModuleState>('clients');

export const selectClientsState = createSelector(
    selectClientsModuleState,
    (state: IClientsModuleState) => state.clientsState
)

export const selectCallPlansState = createSelector(
    selectClientsModuleState,
    (state: IClientsModuleState) => state.callPlanState
)

export const selectCallsDateState = createSelector(
    selectClientsModuleState,
    (state: IClientsModuleState) => state.callsDateState
)

export const selectManagerCallsResultState = createSelector(
    selectClientsModuleState,
    (state: IClientsModuleState) => state.managerCallsResultState
)

export const selectNomenclatureAnalysisState = createSelector(
    selectClientsModuleState,
    (state: IClientsModuleState) => state.nomenclatureAnalysisState
)

export const selectRevenueAnalysisState = createSelector(
    selectClientsModuleState,
    (state: IClientsModuleState) => state.revenueAnalysisState
)

export const selectTripPlanState = createSelector(
    selectClientsModuleState,
    (state: IClientsModuleState) => state.tripPlanState
)

export const selectWeekPlanState = createSelector(
    selectClientsModuleState,
    (state: IClientsModuleState) => state.weekPlanState
)