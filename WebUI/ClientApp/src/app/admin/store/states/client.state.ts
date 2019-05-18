import { Client } from '../../models/client.model';

export interface IClientState {
    clients: Client[],
    loading: boolean,
    error: string
}

export const clientInitialState: IClientState = {
    clients: [],
    loading: false,
    error: null
}