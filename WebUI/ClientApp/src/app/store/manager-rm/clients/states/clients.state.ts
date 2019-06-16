import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';

export interface IClientsState {
    clients: IClient[],
    error: any,
    loading: boolean
}

export const clientsInitialState = {
    clients: [],
    error: null,
    loading: false
}

