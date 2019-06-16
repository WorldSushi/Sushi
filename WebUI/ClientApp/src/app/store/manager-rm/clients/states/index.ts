import { IClientsState, clientsInitialState } from './clients.state';

export interface IManagerRmState {
    clientsState: IClientsState
}

export const managerRmInitialState = {
    clientsState: clientsInitialState
}