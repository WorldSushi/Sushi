import { weekPlansInitialState, IWeekPlanState } from '../states/week-plan.state';
import { WeekPlanActionUnion, WeekPlanActionsTypes } from '../actions/week-plan.actions';

export function weekPlansReducer(state = weekPlansInitialState, action: WeekPlanActionUnion): IWeekPlanState {
    
        switch(action.type) {
                case WeekPlanActionsTypes.GET_WEEK_PLANS: 
                        return {
                                ...state,
                                loading: true
                        }
                
                case WeekPlanActionsTypes.GET_WEEK_PLANS_SUCCESS:
                        return {
                                ...state,
                                weekPlans: action.payload.weekPlans,
                                loading: false
                        }
                
                case WeekPlanActionsTypes.GET_WEEK_PLANS_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }

                case WeekPlanActionsTypes.CREATE_WEEK_PLAN_SUCCESS:
                        return {
                                ...state,
                                weekPlans: [...state.weekPlans, action.payload.weekPlan],
                                loading: false
                        }
                
                case WeekPlanActionsTypes.CREATE_WEEK_PLAN_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }
                
                case WeekPlanActionsTypes.EDIT_WEEK_PLAN_SUCCESS:
                        const index = state.weekPlans.findIndex(item => item.id == action.payload.weekPlan.id);
                        
                        return {
                                ...state,
                                weekPlans: [
                                        ...state.weekPlans.slice(0, index),
                                        action.payload.weekPlan,
                                        ...state.weekPlans.slice(index + 1)
                                ],
                                loading: false
                        }
                
                case WeekPlanActionsTypes.EDIT_WEEK_PLAN_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }              

                default: 
                        return state;
        }

    
}