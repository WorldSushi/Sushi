import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectManagerRmState } from '../../selectors';
import { IManagerRmState } from '../../states';

export const selectClientsState = createSelector(
    selectManagerRmState,
    (state: IManagerRmState) => state.clientsState
)

export const selectCallPlansState = createSelector(
    selectManagerRmState,
    (state: IManagerRmState) => state.callPlanState
)

export const selectCallsDateState = createSelector(
    selectManagerRmState,
    (state: IManagerRmState) => state.callsDateState
)

export const selectManagerCallsResultState = createSelector(
    selectManagerRmState,
    (state: IManagerRmState) => state.managerCallsResultState
)

export const selectNomenclatureAnalysisState = createSelector(
    selectManagerRmState,
    (state: IManagerRmState) => state.nomenclatureAnalysisState
)

export const selectRevenueAnalysisState = createSelector(
    selectManagerRmState,
    (state: IManagerRmState) => state.revenueAnalysisState
)

export const selectTripPlanState = createSelector(
    selectManagerRmState,
    (state: IManagerRmState) => state.tripPlanState
)

export const selectWeekPlanState = createSelector(
    selectManagerRmState,
    (state: IManagerRmState) => state.weekPlanState
)