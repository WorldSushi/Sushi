import { Action } from '@ngrx/store';

import { Manager } from '../../models/manager.model';

export enum ManagerActionTypes {
    GET_ALL = 'Get All Managers',
    GET_ALL_SUCCESS = 'Get All Managers Success',
    GET_ALL_FAILURE = 'Get All Managers Failure'
}

export class GetAll implements Action {
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

export type ManagerActions = GetAll | GetAllSuccess | GetAllFailure