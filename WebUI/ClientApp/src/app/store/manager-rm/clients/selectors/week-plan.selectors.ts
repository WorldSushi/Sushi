import { createSelector } from '@ngrx/store';
import { selectWeekPlanState } from '.';
import { IWeekPlanState } from '../states/week-plan.state';


export const selectWeekPlans = createSelector(
    selectWeekPlanState,
    (state: IWeekPlanState) => state.weekPlans
)

export const selectLoadingStatus = createSelector(
    selectWeekPlanState,
    (state: IWeekPlanState) => state.loading
)

export const selectError = createSelector(
    selectWeekPlanState,
    (state: IWeekPlanState) => state.error
)

export const weekPlanQueries = {
    selectWeekPlans,
    selectLoadingStatus,
    selectError
} 