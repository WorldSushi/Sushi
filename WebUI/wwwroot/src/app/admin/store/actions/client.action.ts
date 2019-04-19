import { Action } from '@ngrx/store';
import { Client } from '../../models/client.model';

export enum ClientActionTypes {
    GET_ALL = "Get All Clients",
    GET_ALL_SUCCESS = "Get All Clients Success",
    GET_ALL_FAILURE = "Get All Clients Failure",
    CREATE_CLIENT = 'Create Client',
    CREATE_CLIENT_SUCCESS = 'Create Client Success',
    CREATE_CLIENT_FAILURE = 'Create Client Failure',
    UPDATE_CLIENT = 'Update Client',
    UPDATE_CLIENT_SUCCESS = 'Update Client Success',
    UPDATE_CLIENT_FAILURE = 'Update Client Failure',
    DELETE_CLIENT = 'Delete Client',
    DELETE_CLIENT_SUCCESS = 'Delete Client Success',
    DELETE_CLIENT_FAILURE = 'Delete Client Failure'
}

export class GetAll implements Action {
    readonly type = ClientActionTypes.GET_ALL;

    constructor() {}
}

export class GetAllSuccess implements Action{
    readonly type = ClientActionTypes.GET_ALL_SUCCESS;

    constructor(public payload: {clients: Client[]}) {}
}

export class GetAllFailure implements Action{
    readonly type = ClientActionTypes.GET_ALL_FAILURE;

    constructor(public payload: {error: string}) {}
}

export class CreateClient implements Action {
    readonly type = ClientActionTypes.CREATE_CLIENT;

    constructor(public payload: {data: Client}){}
}

export class CreateClientSuccess implements Action {
    readonly type = ClientActionTypes.CREATE_CLIENT_SUCCESS;

    constructor(public payload: {data: Client}){}
}

export class CreateClientFailure implements Action {
    readonly type = ClientActionTypes.CREATE_CLIENT_FAILURE;

    constructor(public payload: {error: any}){}
}

export class UpdateClient implements Action {
    readonly type = ClientActionTypes.UPDATE_CLIENT;

    constructor(public payload: {data: Client}){}
}

export class UpdateClientSuccess implements Action {
    readonly type = ClientActionTypes.UPDATE_CLIENT_SUCCESS;

    constructor(public payload: {data: Client}){}
}

export class UpdateClientFailure implements Action {
    readonly type = ClientActionTypes.UPDATE_CLIENT_FAILURE;

    constructor(public payload: {error: any}){}
}

export class DeleteClient implements Action {
    readonly type = ClientActionTypes.DELETE_CLIENT;

    constructor(public payload: {data: number}){}
}

export class DeleteClientSuccess implements Action {
    readonly type = ClientActionTypes.DELETE_CLIENT_SUCCESS;

    constructor(public payload: {data: number}) { }
}

export class DeleteClientFailure implements Action {
    readonly type = ClientActionTypes.DELETE_CLIENT_FAILURE;

    constructor(public payload: {error: any}) { }
}

export type ClientsActions = GetAll 
    | GetAllSuccess 
    | GetAllFailure
    | CreateClient
    | CreateClientSuccess
    | CreateClientFailure
    | UpdateClient
    | UpdateClientSuccess
    | UpdateClientFailure
    | DeleteClient
    | DeleteClientSuccess
    | DeleteClientFailure