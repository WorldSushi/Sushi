import { INomenclatureAnalysis } from 'src/app/manager-rm/clients/shared/models/nomenclature-analysis';

export interface INomenclatureAnalysisState {
    nomenclatureAnalyzes: INomenclatureAnalysis[],
    loading: boolean,
    error: any
}

export const nomenclatureAnalysisInitialState = {
    nomenclatureAnalyzes: [],
    error: null,
    loading: false
}
