import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { GetNomenclatureAnalyzesAction, CreateNomenclatureAnalysisAction, EditNomenclatureAnalysisAction } from '../actions/nomenclature-analysis.actions';
import { INomenclatureAnalysis } from 'src/app/manager-rm/clients/shared/models/nomenclature-analysis';
import { INomenclatureAnalysisState } from '../states/nomenclature-analysis.state';
import { nomenclatureAnalysisQueries } from '../selectors/nomenclature-analysis.selectors';




@Injectable()
export class NomenclatureAnalysisFacade {
    nomenclatureAnalysis$ = this.store.select(nomenclatureAnalysisQueries.selectNomenclatureAnalyzes);
    loading$ = this.store.select(nomenclatureAnalysisQueries.selectLoadingStatus);
    error$ = this.store.select(nomenclatureAnalysisQueries.selectError);

    loadNomenclatureAnalysis(managerId: number){
        this.store.dispatch(new GetNomenclatureAnalyzesAction({ managerId: managerId }));
    }

    createNomenclatureAnalysis(nomenclatureAnalysis: INomenclatureAnalysis) {
        this.store.dispatch(new CreateNomenclatureAnalysisAction({ nomenclatureAnalysis: nomenclatureAnalysis }));
    }

    editNomenclatureAnalysis(nomenclatureAnalysis: INomenclatureAnalysis){
        this.store.dispatch(new EditNomenclatureAnalysisAction({ nomenclatureAnalysis: nomenclatureAnalysis }));
    }


    constructor(private store: Store<INomenclatureAnalysisState>){}
}