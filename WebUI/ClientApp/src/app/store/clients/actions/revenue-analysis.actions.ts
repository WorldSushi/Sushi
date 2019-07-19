import { Action } from '@ngrx/store';
import { IRevenueAnalysis } from 'src/app/manager-rm/clients/shared/models/revenue-analysis';


export enum RevenueAnalysisActionsTypes {
    GET_REVENUE_ANALYZES = '[Clients Page] Get Revenue Analyzes',
    GET_REVENUE_ANALYZES_SUCCESS = '[RevenueAnalysis API] Get Revenue Analyzes Success',
    GET_REVENUE_ANALYZES_FAILURE = '[RevenueAnalysis API] Get Revenue Analyzes Failure',
    CREATE_REVENUE_ANALYSIS = '[Clients Page] Create Revenue Analysis',
    CREATE_REVENUE_ANALYSIS_SUCCESS = '[RevenueAnalysis API] Create Revenue Analysis Success',
    CREATE_REVENUE_ANALYSIS_FAILURE = '[RevenueAnalysis API] Create Revenue Analysis Failure',
    EDIT_REVENUE_ANALYSIS= '[Clients Page] Edit Revenue Analysis',
    EDIT_REVENUE_ANALYSIS_SUCCESS = '[RevenueAnalysis API] Edit Revenue Analysis Success',
    EDIT_REVENUE_ANALYSIS_FAILURE = '[RevenueAnalysis API] Edit Revenue Analysis Failure'
}

export class GetRevenueAnalyzesAction implements Action {
    readonly type = RevenueAnalysisActionsTypes.GET_REVENUE_ANALYZES;

    constructor(public payload: { managerId: number }) { }
}

export class GetRevenueAnalyzesSuccesAction implements Action {
    readonly type = RevenueAnalysisActionsTypes.GET_REVENUE_ANALYZES_SUCCESS;

    constructor(public payload: { revenueAnalyzes: IRevenueAnalysis[] }) { }
}

export class GetRevenueAnalyzesFailureAction implements Action {
    readonly type = RevenueAnalysisActionsTypes.GET_REVENUE_ANALYZES_FAILURE;

    constructor(public payload: { error: any }) { }
}

export class CreateRevenueAnalysisAction implements Action {
    readonly type = RevenueAnalysisActionsTypes.CREATE_REVENUE_ANALYSIS;

    constructor(public payload: { revenueAnalysis: IRevenueAnalysis}){}
}

export class CreateRevenueAnalysisSuccesAction implements Action {
    readonly type = RevenueAnalysisActionsTypes.CREATE_REVENUE_ANALYSIS_SUCCESS;

    constructor(public payload: { revenueAnalysis: IRevenueAnalysis }){}
}

export class CreateRevenueAnalysisFailureAction implements Action{
    readonly type = RevenueAnalysisActionsTypes.CREATE_REVENUE_ANALYSIS_FAILURE;

    constructor(public payload: { error: any }){}
}

export class EditRevenueAnalysisAction implements Action {
    readonly type = RevenueAnalysisActionsTypes.EDIT_REVENUE_ANALYSIS;

    constructor(public payload: { revenueAnalysis: IRevenueAnalysis }){}
}

export class EditRevenueAnalysisSuccesAction implements Action {
    readonly type = RevenueAnalysisActionsTypes.EDIT_REVENUE_ANALYSIS_SUCCESS;

    constructor(public payload: { revenueAnalysis: IRevenueAnalysis }){}
}

export class EditRevenueAnalysisFailureAction implements Action {
    readonly type = RevenueAnalysisActionsTypes.EDIT_REVENUE_ANALYSIS_FAILURE;

    constructor(public payload: { error: any }){}
}

export type RevenueAnalysisActionUnion = GetRevenueAnalyzesAction
    | GetRevenueAnalyzesSuccesAction
    | GetRevenueAnalyzesFailureAction
    | CreateRevenueAnalysisAction
    | CreateRevenueAnalysisSuccesAction
    | CreateRevenueAnalysisFailureAction
    | EditRevenueAnalysisAction
    | EditRevenueAnalysisSuccesAction
    | EditRevenueAnalysisFailureAction