import { createSelector } from '@ngrx/store';
import { selectManagerCallsResultState } from '.';
import { IManagerCallsResultState } from '../states/manager-calls-result.state';


export const selectManagerCallsResults = createSelector(
    selectManagerCallsResultState,
    (state: IManagerCallsResultState) => state.managerCallsResults
)

export const selectLoadingStatus = createSelector(
    selectManagerCallsResultState,
    (state: IManagerCallsResultState) => state.loading
)

export const selectError = createSelector(
    selectManagerCallsResultState,
    (state: IManagerCallsResultState) => state.error
)

export const managerCallsResultQueries = {
    selectManagerCallsResults,
    selectLoadingStatus,
    selectError
} 