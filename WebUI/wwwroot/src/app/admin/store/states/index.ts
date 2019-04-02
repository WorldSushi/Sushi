import { IManagerState, managerInitialState } from "./manager.state";
import { IAppState } from "../../../store/states";

export interface IAdminState extends IAppState {
    managerState: IManagerState
}

export const adminInitialState = {
    managerState: managerInitialState
}