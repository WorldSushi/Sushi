import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../states';
import { userReducer } from './user.reducer';


export const appReducer: ActionReducerMap<IAppState, any> = {
    userState: userReducer
}