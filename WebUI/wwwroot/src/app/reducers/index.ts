import { IAdminState, initialAdminState, adminReducer } from '../admin/reducers/user/user.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface IAppState {
    admin: IAdminState
}

export const initialAppState: IAppState = {
    admin: initialAdminState
}

export function getInitialState(): IAppState {
    return initialAppState;
}

export const appReducers: ActionReducerMap<IAppState, any> = {
    admin: adminReducer
}