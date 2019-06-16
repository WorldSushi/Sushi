import { IClientsState, clientsInitialState } from './clients.state';

export interface IManagerRmState {
    clients: IClientsState
}

export const managerRmInitialState = {
    clients: clientsInitialState
}