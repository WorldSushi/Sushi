import { managerCallsResultInitialState, IManagerCallsResultState } from '../states/manager-calls-result.state';
import { ManagerCallsResultActionUnion, ManagerCallsResultActionsTypes } from '../actions/manager-calls-result.actions';



export function managerCallsResultsReducer(state = managerCallsResultInitialState, action: ManagerCallsResultActionUnion): IManagerCallsResultState {
    
        switch(action.type) {
                case ManagerCallsResultActionsTypes.GET_MANAGER_CALLS_RESULTS: 
                        return {
                                ...state,
                                loading: true
                        }
                
                case ManagerCallsResultActionsTypes.GET_MANAGER_CALLS_RESULTS_SUCCESS:
                        return {
                                ...state,
                                managerCallsResults: action.payload.managerCallsResults,
                                loading: false
                        }
                
                case ManagerCallsResultActionsTypes.GET_MANAGER_CALLS_RESULTS_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }

                case ManagerCallsResultActionsTypes.CREATE_MANAGER_CALLS_RESULT_SUCCESS:
                        return {
                                ...state,
                                managerCallsResults: [...state.managerCallsResults, action.payload.managerCallsResult],
                                loading: false
                        }
                
                case ManagerCallsResultActionsTypes.CREATE_MANAGER_CALLS_RESULT_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }
                
                case ManagerCallsResultActionsTypes.EDIT_MANAGER_CALLS_RESULT_SUCCESS:
                        const index = state.managerCallsResults.findIndex(item => item.id == action.payload.managerCallsResult.id);
                        
                        return {
                                ...state,
                                managerCallsResults: [
                                        ...state.managerCallsResults.slice(0, index),
                                        action.payload.managerCallsResult,
                                        ...state.managerCallsResults.slice(index + 1)
                                ],
                                loading: false
                        }
                
                case ManagerCallsResultActionsTypes.EDIT_MANAGER_CALLS_RESULT_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }              

                default: 
                        return state;
        }

    
}