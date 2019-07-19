import { createSelector } from '@ngrx/store';
import { selectManagersState } from '.';
import { IManagersState } from '../states/managers.state';

export const selectManagers = createSelector(
    selectManagersState,
    (state: IManagersState) => state.managers
)

export const selectLoadingStatus = createSelector(
    selectManagersState,
    (state: IManagersState) => state.loading
)

export const selectError = createSelector(
    selectManagersState,
    (state: IManagersState) => state.error
)

export const managersQueries = {
    selectManagers,
    selectLoadingStatus,
    selectError
} 