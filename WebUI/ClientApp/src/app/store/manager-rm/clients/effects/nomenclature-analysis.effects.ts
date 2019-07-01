import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';
import { NomenclatureAnalysisActionsTypes, CreateNomenclatureAnalysisAction, CreateNomenclatureAnalysisSuccesAction, CreateNomenclatureAnalysisFailureAction, EditNomenclatureAnalysisAction, EditNomenclatureAnalysisSuccesAction, EditNomenclatureAnalysisFailureAction, GetNomenclatureAnalyzesAction, GetNomenclatureAnalyzesSuccesAction, GetNomenclatureAnalyzesFailureAction } from '../actions/nomenclature-analysis.actions';
import { INomenclatureAnalysis } from 'src/app/manager-rm/clients/shared/models/nomenclature-analysis';
import { NomenclatureAnalysissService } from 'src/app/manager-rm/clients/shared/services/nomenclature-analysis';

@Injectable()
export class NomenclatureAnalyzesEffects {
    @Effect() 
    getNomenclatureAnalyzes$ = this.actions$.pipe(
        ofType<GetNomenclatureAnalyzesAction>(NomenclatureAnalysisActionsTypes.GET_NOMENCLATURE_ANALYZES),
        concatMap((action) =>
            this.nomenclatureAnalyzesService.getNomenclatureAnalyzes(action.payload.managerId).pipe(
                map((nomenclatureAnalyzes: INomenclatureAnalysis[]) =>
                    new GetNomenclatureAnalyzesSuccesAction({ nomenclatureAnalyzes: nomenclatureAnalyzes})
                ),
                catchError(error => 
                    of(new GetNomenclatureAnalyzesFailureAction({ error: error }))
                )
            )
        )
    )

    @Effect()
    createNomenclatureAnalysis$ = this.actions$.pipe(
        ofType<CreateNomenclatureAnalysisAction>(NomenclatureAnalysisActionsTypes.CREATE_NOMENCLATURE_ANALYSIS),
        concatMap((action) =>
            this.nomenclatureAnalyzesService.createNomenclatureAnalysis(action.payload.nomenclatureAnalysis).pipe(
                map((nomenclatureAnalysis: INomenclatureAnalysis) =>
                    new CreateNomenclatureAnalysisSuccesAction({ nomenclatureAnalysis: nomenclatureAnalysis })
                ),
                catchError(error => 
                    of(new CreateNomenclatureAnalysisFailureAction({ error: error }))
                )
            )
        )
    )
    
    @Effect()
    editNomenclatureAnalysis$ = this.actions$.pipe(
        ofType<EditNomenclatureAnalysisAction>(NomenclatureAnalysisActionsTypes.EDIT_NOMENCLATURE_ANALYSIS),
        concatMap((action) =>
            this.nomenclatureAnalyzesService.editNomenclatureAnalysis(action.payload.nomenclatureAnalysis).pipe(
                map((nomenclatureAnalysis: INomenclatureAnalysis) =>
                    new EditNomenclatureAnalysisSuccesAction({ nomenclatureAnalysis: nomenclatureAnalysis}) 
                ),
                catchError(error =>
                    of(new EditNomenclatureAnalysisFailureAction({ error: error}))
                )
            )    
        )
    )

    constructor(
        private nomenclatureAnalyzesService: NomenclatureAnalysissService,
        private actions$: Actions
    ) {}
}