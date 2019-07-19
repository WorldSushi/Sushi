import { Action } from '@ngrx/store';
import { IManager } from 'src/app/admin/managers/shared/models/manager.model';

export enum ManagersActionsTypes {
    GET_MANAGERS = '[Admin Managers Page] GET_MANAGERS',
    GET_MANAGERS_SUCCESS = '[Managers API] GET_MANAGERS_SUCCESS',
    GET_MANAGERS_FAILURE = '[Managers API] GET_MANAGERS_FAILURE',
    CREATE_MANAGER = '[Admin Managers Page] CREATE_MANAGER',
    CREATE_MANAGER_SUCCESS = '[Managers API] CREATE_MANAGER_SUCCESS',
    CREATE_MANAGER_FAILURE = '[Managers API] CREATE_MANAGER_FAILURE',
    EDIT_MANAGER = '[Admin Managers Page] EDIT_MANAGER',
    EDIT_MANAGER_SUCCESS = '[Manager API] EDIT_MANAGER_SUCCESS',
    EDIT_MANAGER_FAILURE = '[Manager API] EDIT_MANAGER_FAILURE'
}

export class GetManagersAction implements Action {
    readonly type = ManagersActionsTypes.GET_MANAGERS;

    constructor() { }
}

export class GetManagersSuccesAction implements Action {
    readonly type = ManagersActionsTypes.GET_MANAGERS_SUCCESS;

    constructor(public payload: { managers: IManager[] }) { }
}

export class GetManagersFailureAction implements Action {
    readonly type = ManagersActionsTypes.GET_MANAGERS_FAILURE;

    constructor(public payload: { error: any }) { }
}

export class CreateManagerAction implements Action {
    readonly type = ManagersActionsTypes.CREATE_MANAGER;

    constructor(public payload: { manager: IManager }){}
}

export class CreateManagerSuccesAction implements Action {
    readonly type = ManagersActionsTypes.CREATE_MANAGER_SUCCESS;

    constructor(public payload: { manager: IManager }){}
}

export class CreateManagerFailureAction implements Action{
    readonly type = ManagersActionsTypes.CREATE_MANAGER_FAILURE;

    constructor(public payload: { error: any }){}
}

export class EditManagerAction implements Action {
    readonly type = ManagersActionsTypes.EDIT_MANAGER;

    constructor(public payload: { manager: IManager }){}
}

export class EditManagerSuccesAction implements Action {
    readonly type = ManagersActionsTypes.EDIT_MANAGER_SUCCESS;

    constructor(public payload: { manager: IManager }){}
}

export class EditManagerFailureAction implements Action {
    readonly type = ManagersActionsTypes.EDIT_MANAGER_FAILURE;

    constructor(public payload: { error: any }){}
}

export type ManagersActionUnion = GetManagersAction
    | GetManagersSuccesAction
    | GetManagersFailureAction
    | CreateManagerAction
    | CreateManagerSuccesAction
    | CreateManagerFailureAction
    | EditManagerAction
    | EditManagerSuccesAction
    | EditManagerFailureAction
