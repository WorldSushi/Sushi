import { Action } from '@ngrx/store';
import { User } from '../../models/user/user.models';

export enum ActionTypes {
    GetAll = "GetAll",
    GetAllComplete = "GetAllComplete",
    GetAllError = "GetAllError"
}

export class GetAll implements Action {
    readonly type = ActionTypes.GetAll;
}

export class GetAllComplete implements Action {
    readonly type = ActionTypes.GetAllComplete;

    constructor(public payload: User[]){}
}

export class GetAllError implements Action {
    readonly type = ActionTypes.GetAllError;
}

export type AdminActionsUnion = GetAll | GetAllComplete | GetAllError;
