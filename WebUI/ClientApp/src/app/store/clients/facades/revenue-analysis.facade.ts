import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { revenueAnalysisQueries } from '../selectors/revenue-analysis.selectors';
import { GetRevenueAnalyzesAction, CreateRevenueAnalysisAction, EditRevenueAnalysisAction } from '../actions/revenue-analysis.actions';
import { IRevenueAnalysis } from 'src/app/manager-rm/clients/shared/models/revenue-analysis';
import { IRevenueAnalysisState } from '../states/revenue-analysis.state';



@Injectable()
export class RevenueAnalysisFacade {
    revenueAnalysis$ = this.store.select(revenueAnalysisQueries.selectRevenueAnalyzes);
    loading$ = this.store.select(revenueAnalysisQueries.selectLoadingStatus);
    error$ = this.store.select(revenueAnalysisQueries.selectError);

    loadRevenueAnalysis(managerId: number){
        this.store.dispatch(new GetRevenueAnalyzesAction({ managerId: managerId }));
    }

    createRevenueAnalysis(revenueAnalysis: IRevenueAnalysis) {
        this.store.dispatch(new CreateRevenueAnalysisAction({ revenueAnalysis: revenueAnalysis }));
    }

    editRevenueAnalysis(revenueAnalysis: IRevenueAnalysis){
        this.store.dispatch(new EditRevenueAnalysisAction({ revenueAnalysis: revenueAnalysis }));
    }


    constructor(private store: Store<IRevenueAnalysisState>){}
}