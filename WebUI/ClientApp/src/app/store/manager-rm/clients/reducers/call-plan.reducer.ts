import { callPlanInitialState, ICallPlanState } from '../states/call-plan.state';
import { CallPlanActionUnion, CallPlanActionsTypes } from '../actions/call-plan.actions';



export function callPlansReducer(state = callPlanInitialState, action: CallPlanActionUnion): ICallPlanState {
    
        switch(action.type) {
                case CallPlanActionsTypes.GET_CALL_PLANS: 
                        return {
                                ...state,
                                loading: true
                        }
                
                case CallPlanActionsTypes.GET_CALL_PLANS_SUCCESS:
                        return {
                                ...state,
                                callPlans: action.payload.callPlans,
                                loading: false
                        }
                
                case CallPlanActionsTypes.GET_CALL_PLANS_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }

                case CallPlanActionsTypes.CREATE_CALL_PLAN_SUCCESS:
                        return {
                                ...state,
                                callPlans: [...state.callPlans, action.payload.callPlan],
                                loading: false
                        }
                
                case CallPlanActionsTypes.CREATE_CALL_PLAN_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }
                
                case CallPlanActionsTypes.EDIT_CALL_PLAN_SUCCESS:
                        const index = state.callPlans.findIndex(item => item.id == action.payload.callPlan.id);
                        
                        return {
                                ...state,
                                callPlans: [
                                        ...state.callPlans.slice(0, index),
                                        action.payload.callPlan,
                                        ...state.callPlans.slice(index + 1)
                                ],
                                loading: false
                        }
                
                case CallPlanActionsTypes.EDIT_CALL_PLAN_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }              

                default: 
                        return state;
        }

    
}