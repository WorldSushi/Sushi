import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';
import { GetRevenueAnalyzesAction, RevenueAnalysisActionsTypes, GetRevenueAnalyzesSuccesAction, GetRevenueAnalyzesFailureAction, CreateRevenueAnalysisAction, CreateRevenueAnalysisSuccesAction, CreateRevenueAnalysisFailureAction, EditRevenueAnalysisAction, EditRevenueAnalysisSuccesAction, EditRevenueAnalysisFailureAction } from '../actions/revenue-analysis.actions';
import { IRevenueAnalysis } from 'src/app/manager-rm/clients/shared/models/revenue-analysis';
import { RevenueAnalysisService } from 'src/app/manager-rm/clients/shared/services/revenue-analysis';

@Injectable()
export class RevenueAnalyzesEffects {
    @Effect() 
    getRevenueAnalyzes$ = this.actions$.pipe(
        ofType<GetRevenueAnalyzesAction>(RevenueAnalysisActionsTypes.GET_REVENUE_ANALYZES),
        concatMap((action) =>
            this.revenueAnalyzesService.getRevenueAnalyzes(action.payload.managerId).pipe(
                map((revenueAnalyzes: IRevenueAnalysis[]) =>
                    new GetRevenueAnalyzesSuccesAction({ revenueAnalyzes: revenueAnalyzes})
                ),
                catchError(error => 
                    of(new GetRevenueAnalyzesFailureAction({ error: error }))
                )
            )
        )
    )

    @Effect()
    createRevenueAnalysis$ = this.actions$.pipe(
        ofType<CreateRevenueAnalysisAction>(RevenueAnalysisActionsTypes.CREATE_REVENUE_ANALYSIS),
        concatMap((action) =>
            this.revenueAnalyzesService.createRevenueAnalysis(action.payload.revenueAnalysis).pipe(
                map((revenueAnalysis: IRevenueAnalysis) =>
                    new CreateRevenueAnalysisSuccesAction({ revenueAnalysis: revenueAnalysis })
                ),
                catchError(error => 
                    of(new CreateRevenueAnalysisFailureAction({ error: error }))
                )
            )
        )
    )
    
    @Effect()
    editRevenueAnalysis$ = this.actions$.pipe(
        ofType<EditRevenueAnalysisAction>(RevenueAnalysisActionsTypes.EDIT_REVENUE_ANALYSIS),
        concatMap((action) =>
            this.revenueAnalyzesService.editRevenueAnalysis(action.payload.revenueAnalysis).pipe(
                map((revenueAnalysis: IRevenueAnalysis) =>
                    new EditRevenueAnalysisSuccesAction({ revenueAnalysis: revenueAnalysis}) 
                ),
                catchError(error =>
                    of(new EditRevenueAnalysisFailureAction({ error: error}))
                )
            )    
        )
    )

    constructor(
        private revenueAnalyzesService: RevenueAnalysisService,
        private actions$: Actions
    ) {}
}