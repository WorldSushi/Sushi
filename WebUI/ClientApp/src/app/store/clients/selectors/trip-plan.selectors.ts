import { createSelector } from '@ngrx/store';
import { ITripPlanState } from '../states/trip-plan.state';
import { selectTripPlanState } from '../selectors';



export const selectTripPlans = createSelector(
    selectTripPlanState,
    (state: ITripPlanState) => state.tripPlans
)

export const selectLoadingStatus = createSelector(
    selectTripPlanState,
    (state: ITripPlanState) => state.loading
)

export const selectError = createSelector(
    selectTripPlanState,
    (state: ITripPlanState) => state.error
)

export const tripPlanQueries = {
    selectTripPlans,
    selectLoadingStatus,
    selectError
} 