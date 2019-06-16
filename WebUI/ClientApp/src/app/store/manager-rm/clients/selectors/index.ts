import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectManagerRmState } from '../../selectors';
import { IManagerRmState } from '../../states';

export const selectClientsState = createSelector(
    selectManagerRmState,
    (state: IManagerRmState) => state.clientsState
)