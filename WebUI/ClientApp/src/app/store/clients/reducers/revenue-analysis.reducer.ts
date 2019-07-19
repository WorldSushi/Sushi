import { revenueAnalysisInitialState, IRevenueAnalysisState } from '../states/revenue-analysis.state';
import { RevenueAnalysisActionUnion, RevenueAnalysisActionsTypes } from '../actions/revenue-analysis.actions';


export function revenueAnalyzesReducer(state = revenueAnalysisInitialState, action: RevenueAnalysisActionUnion): IRevenueAnalysisState {
    
        switch(action.type) {
                case RevenueAnalysisActionsTypes.GET_REVENUE_ANALYZES: 
                        return {
                                ...state,
                                loading: true
                        }
                
                case RevenueAnalysisActionsTypes.GET_REVENUE_ANALYZES_SUCCESS:
                        return {
                                ...state,
                                revenueAnalyzes: action.payload.revenueAnalyzes,
                                loading: false
                        }
                
                case RevenueAnalysisActionsTypes.GET_REVENUE_ANALYZES_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }

                case RevenueAnalysisActionsTypes.CREATE_REVENUE_ANALYSIS_SUCCESS:
                        return {
                                ...state,
                                revenueAnalyzes: [...state.revenueAnalyzes, action.payload.revenueAnalysis],
                                loading: false
                        }
                
                case RevenueAnalysisActionsTypes.CREATE_REVENUE_ANALYSIS_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }
                
                case RevenueAnalysisActionsTypes.EDIT_REVENUE_ANALYSIS_SUCCESS:
                        const index = state.revenueAnalyzes.findIndex(item => item.id == action.payload.revenueAnalysis.id);
                        
                        return {
                                ...state,
                                revenueAnalyzes: [
                                        ...state.revenueAnalyzes.slice(0, index),
                                        action.payload.revenueAnalysis,
                                        ...state.revenueAnalyzes.slice(index + 1)
                                ],
                                loading: false
                        }
                
                case RevenueAnalysisActionsTypes.EDIT_REVENUE_ANALYSIS_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }              

                default: 
                        return state;
        }

    
}