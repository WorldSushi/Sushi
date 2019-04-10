import { IManagerState } from '../states';
import { clientReducer } from './client.reducer';
import { ActionReducerMap } from '@ngrx/store';

export const managerReducer: ActionReducerMap<IManagerState, any> = {
    clientState: clientReducer
}