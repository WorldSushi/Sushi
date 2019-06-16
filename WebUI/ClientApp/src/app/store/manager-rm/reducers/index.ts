import { ActionReducerMap } from '@ngrx/store';
import { IManagerRmState } from '../states';
import { clientsReducer } from '../clients/reducers/clients.reducer';

export const managerRmReducers: ActionReducerMap<IManagerRmState> = {
    clientsState: clientsReducer
}