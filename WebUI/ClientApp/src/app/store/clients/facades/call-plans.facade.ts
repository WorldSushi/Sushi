import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { callPlansQueries } from '../selectors/call-plan.selectors';
import { GetCallPlansAction, CreateCallPlanAction, EditCallPlanAction } from '../actions/call-plan.actions';
import { ICallPlanState } from '../states/call-plan.state';
import { ICallPlan } from 'src/app/manager-rm/clients/shared/models/call-plan.model';



@Injectable()
export class CallPlanFacade {
    callPlan$ = this.store.select(callPlansQueries.selectCallPlans);
    loading$ = this.store.select(callPlansQueries.selectLoadingStatus);
    error$ = this.store.select(callPlansQueries.selectError);

    loadCallPlan(managerId: number){
        this.store.dispatch(new GetCallPlansAction({ managerId: managerId }));
    }

    createCallPlan(callPlan: ICallPlan) {
        this.store.dispatch(new CreateCallPlanAction({ callPlan: callPlan }));
    }

    editCallPlan(callPlan: ICallPlan){
        this.store.dispatch(new EditCallPlanAction({ callPlan: callPlan }));
    }


    constructor(private store: Store<ICallPlanState>){}
}