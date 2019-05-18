import { ActionReducerMap } from "@ngrx/store";
import { IAdminState } from "../states";
import { managerReducer } from "./manager.reducer";
import { clientReducer } from './client.reducer';

export const adminReducers: ActionReducerMap<IAdminState, any> = {
    managerState: managerReducer,
    clientState: clientReducer
}