import { IClientsState, clientsInitialState } from '../clients/states/clients.state';

export interface IManagerRmState {
    clientsState: IClientsState
}

export const IManagerRmInitialState = {
    clientsState: clientsInitialState
}