import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../states";
import { adminInitialState } from 'src/app/admin/store/states';

export const appReducers: ActionReducerMap<IAppState> = {
    adminState: adminInitialState
}