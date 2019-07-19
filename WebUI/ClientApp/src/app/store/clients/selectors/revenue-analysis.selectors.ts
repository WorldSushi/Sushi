import { createSelector } from '@ngrx/store';
import { selectRevenueAnalysisState } from '../selectors';
import { IRevenueAnalysisState } from '../states/revenue-analysis.state';



export const selectRevenueAnalyzes = createSelector(
    selectRevenueAnalysisState,
    (state: IRevenueAnalysisState) => state.revenueAnalyzes
)

export const selectLoadingStatus = createSelector(
    selectRevenueAnalysisState,
    (state: IRevenueAnalysisState) => state.loading
)

export const selectError = createSelector(
    selectRevenueAnalysisState,
    (state: IRevenueAnalysisState) => state.error
)

export const revenueAnalysisQueries = {
    selectRevenueAnalyzes,
    selectLoadingStatus,
    selectError
} 