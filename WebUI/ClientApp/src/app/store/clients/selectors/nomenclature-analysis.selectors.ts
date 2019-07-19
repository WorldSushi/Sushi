import { createSelector } from '@ngrx/store';
import { selectNomenclatureAnalysisState } from '../selectors';
import { INomenclatureAnalysisState } from '../states/nomenclature-analysis.state';



export const selectNomenclatureAnalyzes = createSelector(
    selectNomenclatureAnalysisState,
    (state: INomenclatureAnalysisState) => state.nomenclatureAnalyzes
)

export const selectLoadingStatus = createSelector(
    selectNomenclatureAnalysisState,
    (state: INomenclatureAnalysisState) => state.loading
)

export const selectError = createSelector(
    selectNomenclatureAnalysisState,
    (state: INomenclatureAnalysisState) => state.error
)

export const nomenclatureAnalysisQueries = {
    selectNomenclatureAnalyzes,
    selectLoadingStatus,
    selectError
} 