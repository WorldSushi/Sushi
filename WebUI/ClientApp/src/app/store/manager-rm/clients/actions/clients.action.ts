import { Action } from '@ngrx/store';

export enum ClientsActionTypes {
    GET_CLIENTS = '[Clients Page] GET_CLIENTS',
    GET_CLIENTS_SUCCESS = '[Clients API] GET_CLIENTS_SUCCESS',
    GET_CLIENTS_FAILURE = '[Clients API] GET_CLIENTS_FAILURE',
    CREATE_CLIENT = '[Clients Page] CREATE_CLIENT',
    CREATE_CLIENT_SUCCES = '[Clients API] CREATE_CLIENT_SUCCES',
    CREATE_CLIENT_FAILURE = '[Clients API] CREATE_CLIENT_FAILURE',
    EDIT_CLIENT = '[Clients Page] EDIT_CLIENT',
    EDIT_CLIENT_SUCCES = '[Client API] EDIT_CLIENT_SUCCES',
    EDIT_CLIENT_FAILURE = '[Client API] EDIT_CLIENT_FAILURE'
}

export class GetClientsACtion implements Action {
    readonly type = ClientsActionTypes.GET_CLIENTS;

    constructor(public clients: any[]) { }
}
