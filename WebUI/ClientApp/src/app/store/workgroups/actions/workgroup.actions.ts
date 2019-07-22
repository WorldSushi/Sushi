import { Action } from '@ngrx/store';
import { IWorkgroup } from 'src/app/admin/workgroups/shared/models/workgroup.model';

export enum WorkgroupsActionsTypes {
    ADD_CLIENT_TO_WORKGROUP = '[Admin Workgroups Page] ADD_CLIENT_TO_WORKGROUP',
    GET_WORKGROUPS = '[Admin Workgroups Page] GET_WORKGROUPS',
    GET_WORKGROUPS_SUCCESS = '[Workgroups API] GET_WORKGROUPS_SUCCESS',
    GET_WORKGROUPS_FAILURE = '[Workgroups API] GET_WORKGROUPS_FAILURE',
    CREATE_WORKGROUP = '[Admin Workgroups Page] CREATE_WORKGROUP',
    CREATE_WORKGROUP_SUCCESS = '[Workgroups API] CREATE_WORKGROUP_SUCCESS',
    CREATE_WORKGROUP_FAILURE = '[Workgroups API] CREATE_WORKGROUP_FAILURE',
    EDIT_WORKGROUP = '[Admin Workgroups Page] EDIT_WORKGROUP',
    EDIT_WORKGROUP_SUCCESS = '[Workgroup API] EDIT_WORKGROUP_SUCCESS',
    EDIT_WORKGROUP_FAILURE = '[Workgroup API] EDIT_WORKGROUP_FAILURE'
}

export class GetWorkgroupsAction implements Action {
    readonly type = WorkgroupsActionsTypes.GET_WORKGROUPS;

    constructor() { }
}

export class GetWorkgroupsSuccesAction implements Action {
    readonly type = WorkgroupsActionsTypes.GET_WORKGROUPS_SUCCESS;

    constructor(public payload: { workgroups: IWorkgroup[] }) { }
}

export class GetWorkgroupsFailureAction implements Action {
    readonly type = WorkgroupsActionsTypes.GET_WORKGROUPS_FAILURE;

    constructor(public payload: { error: any }) { }
}

export class CreateWorkgroupAction implements Action {
    readonly type = WorkgroupsActionsTypes.CREATE_WORKGROUP;

    constructor(public payload: { workgroup: IWorkgroup }){}
}

export class CreateWorkgroupSuccesAction implements Action {
    readonly type = WorkgroupsActionsTypes.CREATE_WORKGROUP_SUCCESS;

    constructor(public payload: { workgroup: IWorkgroup }){}
}

export class CreateWorkgroupFailureAction implements Action{
    readonly type = WorkgroupsActionsTypes.CREATE_WORKGROUP_FAILURE;

    constructor(public payload: { error: any }){}
}

export class EditWorkgroupAction implements Action {
    readonly type = WorkgroupsActionsTypes.EDIT_WORKGROUP;

    constructor(public payload: { workgroup: IWorkgroup }){}
}

export class EditWorkgroupSuccesAction implements Action {
    readonly type = WorkgroupsActionsTypes.EDIT_WORKGROUP_SUCCESS;

    constructor(public payload: { workgroup: IWorkgroup }){}
}

export class EditWorkgroupFailureAction implements Action {
    readonly type = WorkgroupsActionsTypes.EDIT_WORKGROUP_FAILURE;

    constructor(public payload: { error: any }){}
}

export class AddClientToWorkgroupAction implements Action {
    readonly type = WorkgroupsActionsTypes.ADD_CLIENT_TO_WORKGROUP;

    constructor(public payload: { clientId: number, workgroupId: number }){}
}

export type WorkgroupsActionUnion = GetWorkgroupsAction
    | GetWorkgroupsSuccesAction
    | GetWorkgroupsFailureAction
    | CreateWorkgroupAction
    | CreateWorkgroupSuccesAction
    | CreateWorkgroupFailureAction
    | EditWorkgroupAction
    | EditWorkgroupSuccesAction
    | EditWorkgroupFailureAction
    | AddClientToWorkgroupAction
