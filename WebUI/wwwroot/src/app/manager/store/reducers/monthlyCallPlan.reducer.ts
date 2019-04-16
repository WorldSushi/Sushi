import { monthlyCallPlanInitialState, IMonthlyCallPlanState } from '../states/monthlyCallPlan.state';
import { MonthlyCallPlanActions, MonthlyCallPlanActionTypes } from '../actions/montlyCallPlan.action';
import { NullTemplateVisitor } from '@angular/compiler';

export function monthlyCallPlanReducer(state = monthlyCallPlanInitialState, action: MonthlyCallPlanActions): IMonthlyCallPlanState {
    switch(action.type) {
        case MonthlyCallPlanActionTypes.GET_ALL:
        return {
            ...state,
            error: null,
            loading: true
        };

        case MonthlyCallPlanActionTypes.GET_ALL_SUCCESS:
        return {
            ...state,
            monthlyCallPlans: action.payload.monthlyCallPlans,
            error: null,
            loading: false
        };

        case MonthlyCallPlanActionTypes.GET_ALL_FAILURE:
        return {
            ...state,
            error: action.payload.error,
            loading: false
        };

        default:
        return state;
    }
}