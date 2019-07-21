import { Action } from '@ngrx/store';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';

export enum ClientsActionsTypes {
    GET_MANAGER_CLIENTS = '[Manager Clients Page] GET_CLIENTS',
    GET_ADMIN_CLIENTS = '[Admin Clients Page] GET_CLIENTS',
    GET_CLIENTS_SUCCESS = '[Clients API] GET_CLIENTS_SUCCESS',
    GET_CLIENTS_FAILURE = '[Clients API] GET_CLIENTS_FAILURE',
    CREATE_CLIENT = '[Manager Clients Page] CREATE_CLIENT',
    ADMIN_CREATE_CLIENT = '[Admin Clients Page] CREATE_CLIENT',
    CREATE_CLIENT_SUCCESS = '[Clients API] CREATE_CLIENT_SUCCESS',
    CREATE_CLIENT_FAILURE = '[Clients API] CREATE_CLIENT_FAILURE',
    EDIT_CLIENT = '[Manager Clients Page] EDIT_CLIENT',
    ADMIN_EDIT_CLIENT = '[Admin Clients Page] EDIT_CLIENT',
    EDIT_CLIENT_SUCCESS = '[Client API] EDIT_CLIENT_SUCCESS',
    EDIT_CLIENT_FAILURE = '[Client API] EDIT_CLIENT_FAILURE'
}

export class GetManagerClientsAction implements Action {
    readonly type = ClientsActionsTypes.GET_MANAGER_CLIENTS;

    constructor(public payload: { managerId: number }) { }
}

export class GetAdminClientsAction implements Action {
    readonly type = ClientsActionsTypes.GET_ADMIN_CLIENTS;

    constructor() { }
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

export class AdminCreateClientAction implements Action {
    readonly type = ClientsActionsTypes.ADMIN_CREATE_CLIENT;

    constructor(public payload: { client: IClient }){}
}

export class CreateClientSuccesAction implements Action {
    readonly type = ClientsActionsTypes.CREATE_CLIENT_SUCCESS;

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

export class AdminEditClientAction implements Action {
    readonly type = ClientsActionsTypes.ADMIN_EDIT_CLIENT;

    constructor(public payload: { client: IClient }){}
}

export class EditClientSuccesAction implements Action {
    readonly type = ClientsActionsTypes.EDIT_CLIENT_SUCCESS;

    constructor(public payload: { client: IClient }){}
}

export class EditClientFailureAction implements Action {
    readonly type = ClientsActionsTypes.EDIT_CLIENT_FAILURE;

    constructor(public payload: { error: any }){}
}

export type ClientsActionUnion = GetManagerClientsAction
    | GetAdminClientsAction
    | GetClientsSuccesAction
    | GetClientsFailureAction
    | AdminCreateClientAction
    | CreateClientAction
    | CreateClientSuccesAction
    | CreateClientFailureAction
    | EditClientAction
    | AdminEditClientAction
    | EditClientSuccesAction
    | EditClientFailureAction
