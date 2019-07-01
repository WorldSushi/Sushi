import { TripPlanActionsTypes, TripPlanActionUnion } from '../actions/trip-plan.actions';
import { tripPlanInitialState, ITripPlanState } from '../states/trip-plan.state';

export function tripPlansReducer(state = tripPlanInitialState, action: TripPlanActionUnion): ITripPlanState {
    
        switch(action.type) {
                case TripPlanActionsTypes.GET_TRIP_PLANS: 
                        return {
                                ...state,
                                loading: true
                        }
                
                case TripPlanActionsTypes.GET_TRIP_PLANS_SUCCESS:
                        return {
                                ...state,
                                tripPlans: action.payload.tripPlans,
                                loading: false
                        }
                
                case TripPlanActionsTypes.GET_TRIP_PLANS_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }

                case TripPlanActionsTypes.CREATE_TRIP_PLAN_SUCCESS:
                        return {
                                ...state,
                                tripPlans: [...state.tripPlans, action.payload.tripPlan],
                                loading: false
                        }
                
                case TripPlanActionsTypes.CREATE_TRIP_PLAN_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }
                
                case TripPlanActionsTypes.EDIT_TRIP_PLAN_SUCCESS:
                        const index = state.tripPlans.findIndex(item => item.id == action.payload.tripPlan.id);
                        
                        return {
                                ...state,
                                tripPlans: [
                                        ...state.tripPlans.slice(0, index),
                                        action.payload.tripPlan,
                                        ...state.tripPlans.slice(index + 1)
                                ],
                                loading: false
                        }
                
                case TripPlanActionsTypes.EDIT_TRIP_PLAN_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }              

                default: 
                        return state;
        }

    
}