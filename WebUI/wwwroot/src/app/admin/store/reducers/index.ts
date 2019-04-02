import { ActionReducerMap } from "@ngrx/store";
import { IAdminState } from "../states";
import { managerReducer } from "./manager.reducer";

export const adminReducers: ActionReducerMap<IAdminState, any> = {
    managerState: managerReducer
}