import { ActionReducerMap } from '@ngrx/store';
import { managerReducer } from './manager.reducer';
import { IManagersModuleState } from '../states/managers-module.state';


export const managersModuleReducers: ActionReducerMap<IManagersModuleState> = {
    managersState: managerReducer,
}