import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { tripPlanQueries } from '../selectors/trip-plan.selectors';
import { GetTripPlansAction, CreateTripPlanAction, EditTripPlanHoursAction, EditTripPlanCompletedTypeAction} from '../actions/trip-plan.actions';
import { ITripPlan } from 'src/app/manager-rm/clients/shared/models/trip-plan.model';
import { ITripPlanState } from '../states/trip-plan.state';


@Injectable()
export class TripPlanFacade {
    tripPlan$ = this.store.select(tripPlanQueries.selectTripPlans);
    loading$ = this.store.select(tripPlanQueries.selectLoadingStatus);
    error$ = this.store.select(tripPlanQueries.selectError);

    loadTripPlan(managerId: number){
        this.store.dispatch(new GetTripPlansAction({ managerId: managerId }));
    }

    createTripPlan(tripPlan: ITripPlan) {
        this.store.dispatch(new CreateTripPlanAction({ tripPlan: tripPlan }));
    }

    editTripPlanHours(tripPlan: ITripPlan){
        this.store.dispatch(new EditTripPlanHoursAction({ tripPlan: tripPlan }));
    }

    editTripPlanCompletedType(tripPlan: ITripPlan){
        this.store.dispatch(new EditTripPlanCompletedTypeAction({ tripPlan: tripPlan }))
    }


    constructor(private store: Store<ITripPlanState>){}
}