import { IRevenueAnalysis } from 'src/app/manager-rm/clients/shared/models/revenue-analysis';

export interface IRevenueAnalysisState {
    revenueAnalyzes: IRevenueAnalysis[],
    loading: boolean,
    error: any
}

export const revenueAnalysisInitialState = {
    revenueAnalyzes: [],
    error: null,
    loading: false
}