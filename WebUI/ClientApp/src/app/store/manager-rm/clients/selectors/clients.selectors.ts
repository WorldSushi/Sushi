import { createSelector } from '@ngrx/store';
import { selectClientsState } from '.';
import { IClientsState } from '../states/clients.state';

export const selectClients = createSelector(
    selectClientsState,
    (state: IClientsState) => state.clients
)

export const selectLoadingStatus = createSelector(
    selectClientsState,
    (state: IClientsState) => state.loading
)

export const selectError = createSelector(
    selectClientsState,
    (state: IClientsState) => state.error
)

export const clientsQueries = {
    selectClients,
    selectLoadingStatus,
    selectError
} 