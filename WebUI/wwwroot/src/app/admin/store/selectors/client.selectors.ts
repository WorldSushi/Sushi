import { createSelector } from "@ngrx/store";
import { IAdminState } from '../states';
import { selectAdminState } from '.';
import { IClientState } from '../states/client.state';

const selectClientState = createSelector(
    selectAdminState,
    (state: IAdminState) => state.clientState);

export const selectClientList = createSelector(
    selectClientState,
    (state: IClientState) => state.clients);
