import { IManagerState, managerInitialState } from "./manager.state";
import { IAppState } from "../../../store/states";
import { IClientState, clientInitialState } from './client.state';

export interface IAdminState extends IAppState {
    managerState: IManagerState,
    clientState: IClientState
}

export const adminInitialState = {
    managerState: managerInitialState,
    clientState: clientInitialState
}