import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../states";
import { adminInitialState } from 'src/app/admin/store/states';
import { managerInitialState } from 'src/app/admin/store/states/manager.state';

export const appReducers: ActionReducerMap<IAppState> = {
    adminState: adminInitialState,
    managerState: managerInitialState
}