import { Action } from '@ngrx/store';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';

export enum ClientsActionsTypes {
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

export class GetClientsAction implements Action {
    readonly type = ClientsActionsTypes.GET_CLIENTS;

    constructor(public payload: { managerId: number }) { }
}

export class GetClientsSuccesAction implements Action {
    readonly type = ClientsActionsTypes.GET_CLIENTS_SUCCESS;

    constructor(public payload: { clients: IClient[] }) { }
}

export class GetClientsFailureAction implements Action {
    readonly type = ClientsActionsTypes.GET_CLIENTS_FAILURE;

    constructor(public payload: { error: any }) { }
}

export class CreateClientAction implements Action {
    readonly type = ClientsActionsTypes.CREATE_CLIENT;

    constructor(public payload: { client: IClient }){}
}

export class CreateClientSuccesAction implements Action {
    readonly type = ClientsActionsTypes.CREATE_CLIENT_SUCCES;

    constructor(public payload: { client: IClient }){}
}

export class CreateClientFailureAction implements Action{
    readonly type = ClientsActionsTypes.CREATE_CLIENT_FAILURE;

    constructor(public payload: { error: any }){}
}

export class EditClientAction implements Action {
    readonly type = ClientsActionsTypes.EDIT_CLIENT;

    constructor(public payload: { client: IClient }){}
}

export class EditClientSuccesAction implements Action {
    readonly type = ClientsActionsTypes.EDIT_CLIENT_SUCCES;

    constructor(public payload: { client: IClient }){}
}

export class EditClientFailureAction implements Action {
    readonly type = ClientsActionsTypes.EDIT_CLIENT_FAILURE;

    constructor(public payload: { error: any }){}
}

export type ClientsActionUnion = GetClientsAction
    | GetClientsSuccesAction
    | GetClientsFailureAction
    | CreateClientAction
    | CreateClientSuccesAction
    | CreateClientFailureAction
    | EditClientAction
    | EditClientSuccesAction
    | EditClientFailureAction
