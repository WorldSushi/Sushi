import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { weekPlanQueries } from '../selectors/week-plan.selectors';
import { GetWeekPlansAction, CreateWeekPlanAction, EditWeekPlanAction, AddFactToWeekPlanAction } from '../actions/week-plan.actions';
import { IWeekPlan } from 'src/app/manager-rm/clients/shared/models/week-plan.model';
import { IWeekPlanState } from '../states/week-plan.state';


@Injectable()
export class WeekPlanFacade {
    weekPlan$ = this.store.select(weekPlanQueries.selectWeekPlans);
    loading$ = this.store.select(weekPlanQueries.selectLoadingStatus);
    error$ = this.store.select(weekPlanQueries.selectError);

    loadWeekPlan(managerId: number){
        this.store.dispatch(new GetWeekPlansAction({ managerId: managerId }));
    }

    createWeekPlan(weekPlan: IWeekPlan) {
        this.store.dispatch(new CreateWeekPlanAction({ weekPlan: weekPlan }));
    }

    editWeekPlan(weekPlan: IWeekPlan){
        this.store.dispatch(new EditWeekPlanAction({ weekPlan: weekPlan }));
    }

    addFactToWeekPlan(weekPlan: IWeekPlan){
        this.store.dispatch(new AddFactToWeekPlanAction({ weekPlan: weekPlan }));
    }


    constructor(private store: Store<IWeekPlanState>){}
}