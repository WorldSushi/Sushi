import { IClientState, clientInitialState } from './client.state';
import { IAppState } from '../../../store/states';

export interface IManagerState extends IAppState{
    clientState: IClientState
}

export const managerIniialState = {
    clientInitialState: clientInitialState
}