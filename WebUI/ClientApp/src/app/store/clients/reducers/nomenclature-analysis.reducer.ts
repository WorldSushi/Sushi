import { NomenclatureAnalysisActionUnion, NomenclatureAnalysisActionsTypes } from '../actions/nomenclature-analysis.actions';
import { INomenclatureAnalysisState, nomenclatureAnalysisInitialState } from '../states/nomenclature-analysis.state';




export function nomenclatureAnalyzesReducer(state = nomenclatureAnalysisInitialState, action: NomenclatureAnalysisActionUnion): INomenclatureAnalysisState {
    
        switch(action.type) {
                case NomenclatureAnalysisActionsTypes.GET_NOMENCLATURE_ANALYZES: 
                        return {
                                ...state,
                                loading: true
                        }
                
                case NomenclatureAnalysisActionsTypes.GET_NOMENCLATURE_ANALYZES_SUCCESS:
                        return {
                                ...state,
                                nomenclatureAnalyzes: action.payload.nomenclatureAnalyzes,
                                loading: false
                        }
                
                case NomenclatureAnalysisActionsTypes.GET_NOMENCLATURE_ANALYZES_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }

                case NomenclatureAnalysisActionsTypes.CREATE_NOMENCLATURE_ANALYSIS_SUCCESS:
                        return {
                                ...state,
                                nomenclatureAnalyzes: [...state.nomenclatureAnalyzes, action.payload.nomenclatureAnalysis],
                                loading: false
                        }
                
                case NomenclatureAnalysisActionsTypes.CREATE_NOMENCLATURE_ANALYSIS_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }
                
                case NomenclatureAnalysisActionsTypes.EDIT_NOMENCLATURE_ANALYSIS_SUCCESS:
                        const index = state.nomenclatureAnalyzes.findIndex(item => item.id == action.payload.nomenclatureAnalysis.id);
                        
                        return {
                                ...state,
                                nomenclatureAnalyzes: [
                                        ...state.nomenclatureAnalyzes.slice(0, index),
                                        action.payload.nomenclatureAnalysis,
                                        ...state.nomenclatureAnalyzes.slice(index + 1)
                                ],
                                loading: false
                        }
                
                case NomenclatureAnalysisActionsTypes.EDIT_NOMENCLATURE_ANALYSIS_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }              

                default: 
                        return state;
        }

    
}