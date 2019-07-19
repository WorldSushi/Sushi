import { Action } from '@ngrx/store';
import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';
import { IManagerCallsResult } from 'src/app/manager-rm/clients/shared/models/Manager-calls-result.model';


export enum ManagerCallsResultActionsTypes {
    GET_MANAGER_CALLS_RESULTS = '[Clients Page] Get Manager Calls Results',
    GET_MANAGER_CALLS_RESULTS_SUCCESS = '[ManagerCallsResult API] Get Manager Calls Results Success',
    GET_MANAGER_CALLS_RESULTS_FAILURE = '[ManagerCallsResult API] Get Manager Calls Results Failure',
    CREATE_MANAGER_CALLS_RESULT = '[Clients Page] Create Manager Calls Result',
    CREATE_MANAGER_CALLS_RESULT_SUCCESS = '[ManagerCallsResult API] Create Manager Calls Result Success',
    CREATE_MANAGER_CALLS_RESULT_FAILURE = '[ManagerCallsResult API] Create Manager Calls Result Failure',
    EDIT_MANAGER_CALLS_RESULT= '[Clients Page] Edit Manager Calls Result',
    EDIT_MANAGER_CALLS_RESULT_SUCCESS = '[ManagerCallsResult API] Edit Manager Calls Result Success',
    EDIT_MANAGER_CALLS_RESULT_FAILURE = '[ManagerCallsResult API] Edit Manager Calls Result Failure'
}

export class GetManagerCallsResultsAction implements Action {
    readonly type = ManagerCallsResultActionsTypes.GET_MANAGER_CALLS_RESULTS;

    constructor(public payload: { managerId: number }) { }
}

export class GetManagerCallsResultsSuccesAction implements Action {
    readonly type = ManagerCallsResultActionsTypes.GET_MANAGER_CALLS_RESULTS_SUCCESS;

    constructor(public payload: { managerCallsResults: IManagerCallsResult[] }) { }
}

export class GetManagerCallsResultsFailureAction implements Action {
    readonly type = ManagerCallsResultActionsTypes.GET_MANAGER_CALLS_RESULTS_FAILURE;

    constructor(public payload: { error: any }) { }
}

export class CreateManagerCallsResultAction implements Action {
    readonly type = ManagerCallsResultActionsTypes.CREATE_MANAGER_CALLS_RESULT;

    constructor(public payload: { managerCallsResult: IManagerCallsResult }){}
}

export class CreateManagerCallsResultSuccesAction implements Action {
    readonly type = ManagerCallsResultActionsTypes.CREATE_MANAGER_CALLS_RESULT_SUCCESS;

    constructor(public payload: { managerCallsResult: IManagerCallsResult }){}
}

export class CreateManagerCallsResultFailureAction implements Action{
    readonly type = ManagerCallsResultActionsTypes.CREATE_MANAGER_CALLS_RESULT_FAILURE;

    constructor(public payload: { error: any }){}
}

export class EditManagerCallsResultAction implements Action {
    readonly type = ManagerCallsResultActionsTypes.EDIT_MANAGER_CALLS_RESULT;

    constructor(public payload: { managerCallsResult: IManagerCallsResult }){}
}

export class EditManagerCallsResultSuccesAction implements Action {
    readonly type = ManagerCallsResultActionsTypes.EDIT_MANAGER_CALLS_RESULT_SUCCESS;

    constructor(public payload: { managerCallsResult: IManagerCallsResult }){}
}

export class EditManagerCallsResultFailureAction implements Action {
    readonly type = ManagerCallsResultActionsTypes.EDIT_MANAGER_CALLS_RESULT_FAILURE;

    constructor(public payload: { error: any }){}
}

export type ManagerCallsResultActionUnion = GetManagerCallsResultsAction
    | GetManagerCallsResultsSuccesAction
    | GetManagerCallsResultsFailureAction
    | CreateManagerCallsResultAction
    | CreateManagerCallsResultSuccesAction
    | CreateManagerCallsResultFailureAction
    | EditManagerCallsResultAction
    | EditManagerCallsResultSuccesAction
    | EditManagerCallsResultFailureAction