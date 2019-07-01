import { Action } from '@ngrx/store';
import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';


export enum CallsDateActionsTypes {
    GET_CALLS_DATES = '[Clients Page] Get Calls Dates',
    GET_CALLS_DATES_SUCCESS = '[CallsDate API] Get Calls Dates Success',
    GET_CALLS_DATES_FAILURE = '[CallsDate API] Get Calls Dates Failure',
    CREATE_CALLS_DATE = '[Clients Page] Create Calls Date',
    CREATE_CALLS_DATE_SUCCESS = '[CallsDate API] Create Calls Date Success',
    CREATE_CALLS_DATE_FAILURE = '[CallsDate API] Create Calls Date Failure',
    EDIT_CALLS_DATE= '[Clients Page] Edit Calls Date',
    EDIT_CALLS_DATE_SUCCESS = '[CallsDate API] Edit Calls Date Success',
    EDIT_CALLS_DATE_FAILURE = '[CallsDate API] Edit Calls Date Failure'
}

export class GetCallsDatesAction implements Action {
    readonly type = CallsDateActionsTypes.GET_CALLS_DATES;

    constructor(public payload: { managerId: number }) { }
}

export class GetCallsDatesSuccesAction implements Action {
    readonly type = CallsDateActionsTypes.GET_CALLS_DATES_SUCCESS;

    constructor(public payload: { callsDates: ICallsDate[] }) { }
}

export class GetCallsDatesFailureAction implements Action {
    readonly type = CallsDateActionsTypes.GET_CALLS_DATES_FAILURE;

    constructor(public payload: { error: any }) { }
}

export class CreateCallsDateAction implements Action {
    readonly type = CallsDateActionsTypes.CREATE_CALLS_DATE;

    constructor(public payload: { callsDate: ICallsDate }){}
}

export class CreateCallsDateSuccesAction implements Action {
    readonly type = CallsDateActionsTypes.CREATE_CALLS_DATE_SUCCESS;

    constructor(public payload: { callsDate: ICallsDate }){}
}

export class CreateCallsDateFailureAction implements Action{
    readonly type = CallsDateActionsTypes.CREATE_CALLS_DATE_FAILURE;

    constructor(public payload: { error: any }){}
}

export class EditCallsDateAction implements Action {
    readonly type = CallsDateActionsTypes.EDIT_CALLS_DATE;

    constructor(public payload: { callsDate: ICallsDate }){}
}

export class EditCallsDateSuccesAction implements Action {
    readonly type = CallsDateActionsTypes.EDIT_CALLS_DATE_SUCCESS;

    constructor(public payload: { callsDate: ICallsDate }){}
}

export class EditCallsDateFailureAction implements Action {
    readonly type = CallsDateActionsTypes.EDIT_CALLS_DATE_FAILURE;

    constructor(public payload: { error: any }){}
}

export type CallsDateActionUnion = GetCallsDatesAction
    | GetCallsDatesSuccesAction
    | GetCallsDatesFailureAction
    | CreateCallsDateAction
    | CreateCallsDateSuccesAction
    | CreateCallsDateFailureAction
    | EditCallsDateAction
    | EditCallsDateSuccesAction
    | EditCallsDateFailureAction