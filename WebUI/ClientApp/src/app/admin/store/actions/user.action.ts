import { Action } from '@ngrx/store';

import { Manager } from '../../models/manager.model';

export enum ManagerActionTypes {
    GET_ALL = 'Get All Managers',
    GET_ALL_SUCCESS = 'Get All Managers Success',
    GET_ALL_FAILURE = 'Get All Managers Failure',
    CREATE_MANAGER = 'Create Manager',
    CREATE_MANAGER_SUCCESS = 'Create Manager Success',
    CREATE_MANAGER_FAILURE = 'Create Manager Failure',
    UPDATE_MANAGER = 'Update Manager',
    UPDATE_MANAGER_SUCCESS = 'Update Manager Success',
    UPDATE_MANAGER_FAILURE = 'Update Manager Failure',
    DELETE_MANAGER = 'Delete Manager',
    DELETE_MANAGER_SUCCESS = 'Delete Manager Success',
    DELETE_MANAGER_FAILURE = 'Delete Manager Failure'
}


export class GetAllManagers implements Action {
    readonly type = ManagerActionTypes.GET_ALL;

    constructor() {}
}

export class GetAllSuccess implements Action {
    readonly type = ManagerActionTypes.GET_ALL_SUCCESS;

    constructor(public payload: {managers: Manager[]}) {}
}

export class GetAllFailure implements Action {
    readonly type = ManagerActionTypes.GET_ALL_FAILURE;

    constructor(public payload: {error: string}) {}
}

export class CreateManager implements Action {
    readonly type = ManagerActionTypes.CREATE_MANAGER;

    constructor(public payload: {data: Manager}){}
}

export class CreateManagerSuccess implements Action {
    readonly type = ManagerActionTypes.CREATE_MANAGER_SUCCESS;

    constructor(public payload: {data: Manager}){}
}

export class CreateManagerFailure implements Action {
    readonly type = ManagerActionTypes.CREATE_MANAGER_FAILURE;

    constructor(public payload: {error: any}){}
}

export class UpdateManager implements Action {
    readonly type = ManagerActionTypes.UPDATE_MANAGER;

    constructor(public payload: {data: Manager}){}
}

export class UpdateManagerSuccess implements Action {
    readonly type = ManagerActionTypes.UPDATE_MANAGER_SUCCESS;

    constructor(public payload: {data: Manager}){}
}

export class UpdateManagerFailure implements Action {
    readonly type = ManagerActionTypes.UPDATE_MANAGER_FAILURE;

    constructor(public payload: {error: any}){}
}

export class DeleteManager implements Action {
    readonly type = ManagerActionTypes.DELETE_MANAGER;

    constructor(public payload: {data: number}){}
}

export class DeleteManagerSuccess implements Action {
    readonly type = ManagerActionTypes.DELETE_MANAGER_SUCCESS;

    constructor(public payload: {data: number}) { }
}

export class DeleteManagerFailure implements Action {
    readonly type = ManagerActionTypes.DELETE_MANAGER_FAILURE;

    constructor(public payload: {error: any}) { }
}

export type ManagerActions = GetAllManagers 
    | GetAllSuccess 
    | GetAllFailure
    | CreateManager
    | CreateManagerSuccess
    | CreateManagerFailure
    | UpdateManager
    | UpdateManagerSuccess
    | UpdateManagerFailure
    | DeleteManager  
    | DeleteManagerSuccess
    | DeleteManagerFailure