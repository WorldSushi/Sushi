import { Action } from '@ngrx/store';
import { User } from '../../models/user/user.models';

export enum UserActionTypes {
    GetAll = "GetAll",
    GetAllComplete = "GetAllComplete",
    GetAllError = "GetAllError"
}

export class GetAll implements Action {
    readonly type = UserActionTypes.GetAll;
}

export class GetAllComplete implements Action {
    readonly type = UserActionTypes.GetAllComplete;

    constructor(public payload: User[]){}
}

export class GetAllError implements Action {
    readonly type = UserActionTypes.GetAllError;
}

export type UserActionsUnion = GetAll | GetAllComplete | GetAllError;
