import { Action } from '@ngrx/store';
import { IUser } from 'src/app/shared/models/user.model';


export enum UserActionsTypes {
    GET_CURRENT_USER = '[Clients Page] Get Current User',
    GET_CURRENT_USER_SUCCESS = '[User API] Get Current User Success',
    GET_CURRENT_USER_FAILURE = '[User API] Get Current User Failure',
}

export class GetCurrentUserAction implements Action {
    readonly type = UserActionsTypes.GET_CURRENT_USER;

    constructor() { }
}

export class GetCurrentUserSuccesAction implements Action {
    readonly type = UserActionsTypes.GET_CURRENT_USER_SUCCESS;

    constructor(public payload: { currentUser: IUser }) { }
}

export class GetCurrentUserFailureAction implements Action {
    readonly type = UserActionsTypes.GET_CURRENT_USER_FAILURE;

    constructor(public payload: { error: any }) { }
}

export type userActionUnion = GetCurrentUserAction
    | GetCurrentUserSuccesAction
    | GetCurrentUserFailureAction