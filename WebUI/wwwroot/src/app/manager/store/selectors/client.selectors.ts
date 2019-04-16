import { IClientState } from '../states/client.state';
import { IManagerState } from '../states';
import { selectManagerState } from '.';
import { createSelector } from '@ngrx/store';

const selectClientState = createSelector(
    selectManagerState,
    (state: IManagerState) => state.clientState);

export const selectClientList = createSelector(
    selectClientState,
    (state: IClientState) => state.clients);
