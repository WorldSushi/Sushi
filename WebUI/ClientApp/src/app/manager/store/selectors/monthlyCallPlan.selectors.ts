import { createSelector } from "@ngrx/store";
import { IManagerState } from '../states';
import { selectManagerState } from '.';
import { IMonthlyCallPlanState } from '../states/monthlyCallPlan.state';

const selectMonthlyCallPlanState = createSelector(
    selectManagerState,
    (state: IManagerState) => state.monthlyCallPlanState);

export const selectMonthlyCallPlanList = createSelector(
    selectMonthlyCallPlanState,
    (state: IMonthlyCallPlanState) => state.monthlyCallPlans);