import { createSelector } from '@ngrx/store';
import { ICallPlanState } from '../states/call-plan.state';
import { selectCallPlansState } from '../selectors';


export const selectCallPlans = createSelector(
    selectCallPlansState,
    (state: ICallPlanState) => state.callPlans
)

export const selectLoadingStatus = createSelector(
    selectCallPlansState,
    (state: ICallPlanState) => state.loading
)

export const selectError = createSelector(
    selectCallPlansState,
    (state: ICallPlanState) => state.error
)

export const callPlansQueries = {
    selectCallPlans,
    selectLoadingStatus,
    selectError
} 