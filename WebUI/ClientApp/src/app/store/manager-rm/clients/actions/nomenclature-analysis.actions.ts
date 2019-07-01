import { Action } from '@ngrx/store';
import { INomenclatureAnalysis } from 'src/app/manager-rm/clients/shared/models/nomenclature-analysis';


export enum NomenclatureAnalysisActionsTypes {
    GET_NOMENCLATURE_ANALYZES = '[Clients Page] Get Nomenclature Analyzes',
    GET_NOMENCLATURE_ANALYZES_SUCCESS = '[NomenclatureAnalysis API] Get Nomenclature Analyzes Success',
    GET_NOMENCLATURE_ANALYZES_FAILURE = '[NomenclatureAnalysis API] Get Nomenclature Analyzes Failure',
    CREATE_NOMENCLATURE_ANALYSIS = '[Clients Page] Create Nomenclature Analysis',
    CREATE_NOMENCLATURE_ANALYSIS_SUCCESS = '[NomenclatureAnalysis API] Create Nomenclature Analysis Success',
    CREATE_NOMENCLATURE_ANALYSIS_FAILURE = '[NomenclatureAnalysis API] Create Nomenclature Analysis Failure',
    EDIT_NOMENCLATURE_ANALYSIS= '[Clients Page] Edit Nomenclature Analysis',
    EDIT_NOMENCLATURE_ANALYSIS_SUCCESS = '[NomenclatureAnalysis API] Edit Nomenclature Analysis Success',
    EDIT_NOMENCLATURE_ANALYSIS_FAILURE = '[NomenclatureAnalysis API] Edit Nomenclature Analysis Failure'
}

export class GetNomenclatureAnalyzesAction implements Action {
    readonly type = NomenclatureAnalysisActionsTypes.GET_NOMENCLATURE_ANALYZES;

    constructor(public payload: { managerId: number }) { }
}

export class GetNomenclatureAnalyzesSuccesAction implements Action {
    readonly type = NomenclatureAnalysisActionsTypes.GET_NOMENCLATURE_ANALYZES_SUCCESS;

    constructor(public payload: { nomenclatureAnalyzes: INomenclatureAnalysis[] }) { }
}

export class GetNomenclatureAnalyzesFailureAction implements Action {
    readonly type = NomenclatureAnalysisActionsTypes.GET_NOMENCLATURE_ANALYZES_FAILURE;

    constructor(public payload: { error: any }) { }
}

export class CreateNomenclatureAnalysisAction implements Action {
    readonly type = NomenclatureAnalysisActionsTypes.CREATE_NOMENCLATURE_ANALYSIS;

    constructor(public payload: { nomenclatureAnalysis: INomenclatureAnalysis}){}
}

export class CreateNomenclatureAnalysisSuccesAction implements Action {
    readonly type = NomenclatureAnalysisActionsTypes.CREATE_NOMENCLATURE_ANALYSIS_SUCCESS;

    constructor(public payload: { nomenclatureAnalysis: INomenclatureAnalysis }){}
}

export class CreateNomenclatureAnalysisFailureAction implements Action{
    readonly type = NomenclatureAnalysisActionsTypes.CREATE_NOMENCLATURE_ANALYSIS_FAILURE;

    constructor(public payload: { error: any }){}
}

export class EditNomenclatureAnalysisAction implements Action {
    readonly type = NomenclatureAnalysisActionsTypes.EDIT_NOMENCLATURE_ANALYSIS;

    constructor(public payload: { nomenclatureAnalysis: INomenclatureAnalysis }){}
}

export class EditNomenclatureAnalysisSuccesAction implements Action {
    readonly type = NomenclatureAnalysisActionsTypes.EDIT_NOMENCLATURE_ANALYSIS_SUCCESS;

    constructor(public payload: { nomenclatureAnalysis: INomenclatureAnalysis }){}
}

export class EditNomenclatureAnalysisFailureAction implements Action {
    readonly type = NomenclatureAnalysisActionsTypes.EDIT_NOMENCLATURE_ANALYSIS_FAILURE;

    constructor(public payload: { error: any }){}
}

export type NomenclatureAnalysisActionUnion = GetNomenclatureAnalyzesAction
    | GetNomenclatureAnalyzesSuccesAction
    | GetNomenclatureAnalyzesFailureAction
    | CreateNomenclatureAnalysisAction
    | CreateNomenclatureAnalysisSuccesAction
    | CreateNomenclatureAnalysisFailureAction
    | EditNomenclatureAnalysisAction
    | EditNomenclatureAnalysisSuccesAction
    | EditNomenclatureAnalysisFailureAction