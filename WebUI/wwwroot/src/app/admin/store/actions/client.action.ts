import { Action } from '@ngrx/store';
import { Client } from '../../models/client.model';

export enum ClientActionTypes {
    GET_ALL = "Get All Clients",
    GET_ALL_SUCCESS = "Get All Clients Success",
    GET_ALL_FAILURE = "Get All Clients Failure"
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

export type ClientsActions = GetAll | GetAllSuccess | GetAllFailure