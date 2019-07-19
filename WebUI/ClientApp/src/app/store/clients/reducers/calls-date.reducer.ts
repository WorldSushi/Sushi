
import { CallsDateActionUnion, CallsDateActionsTypes } from '../actions/calls-date.actions';
import { callsDateInitialState, ICallsDateState } from '../states/calls-date.state';



export function callsDatesReducer(state = callsDateInitialState, action: CallsDateActionUnion): ICallsDateState {
    
        switch(action.type) {
                case CallsDateActionsTypes.GET_CALLS_DATES: 
                        return {
                                ...state,
                                loading: true
                        }
                
                case CallsDateActionsTypes.GET_CALLS_DATES_SUCCESS:
                        return {
                                ...state,
                                callsDates: action.payload.callsDates,
                                loading: false
                        }
                
                case CallsDateActionsTypes.GET_CALLS_DATES_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }

                case CallsDateActionsTypes.CREATE_CALLS_DATE_SUCCESS:
                        return {
                                ...state,
                                callsDates: [...state.callsDates, action.payload.callsDate],
                                loading: false
                        }
                
                case CallsDateActionsTypes.CREATE_CALLS_DATE_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }
                
                case CallsDateActionsTypes.EDIT_CALLS_DATE_SUCCESS:
                        const index = state.callsDates.findIndex(item => item.id == action.payload.callsDate.id);
                        
                        return {
                                ...state,
                                callsDates: [
                                        ...state.callsDates.slice(0, index),
                                        action.payload.callsDate,
                                        ...state.callsDates.slice(index + 1)
                                ],
                                loading: false
                        }
                
                case CallsDateActionsTypes.EDIT_CALLS_DATE_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }              

                default: 
                        return state;
        }

    
}