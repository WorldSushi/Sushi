import { createSelector } from '@ngrx/store';
import { ICallsDateState } from '../states/calls-date.state';
import { selectCallsDateState } from '../selectors';



export const selectCallsDates = createSelector(
    selectCallsDateState,
    (state: ICallsDateState) => state.callsDates
)

export const selectLoadingStatus = createSelector(
    selectCallsDateState,
    (state: ICallsDateState) => state.loading
)

export const selectError = createSelector(
    selectCallsDateState,
    (state: ICallsDateState) => state.error
)

export const callsDateQueries = {
    selectCallsDates,
    selectLoadingStatus,
    selectError
} 
