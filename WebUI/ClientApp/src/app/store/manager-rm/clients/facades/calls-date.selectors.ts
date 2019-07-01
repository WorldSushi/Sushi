import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { callsDateQueries } from '../selectors/calls-date.selectors';
import { GetCallsDatesAction, CreateCallsDateAction, EditCallsDateAction } from '../actions/calls-date.actions';
import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';
import { ICallsDateState } from '../states/calls-date.state';



@Injectable()
export class CallsDateFacade {
    callsDate$ = this.store.select(callsDateQueries.selectCallsDates);
    loading$ = this.store.select(callsDateQueries.selectLoadingStatus);
    error$ = this.store.select(callsDateQueries.selectError);

    loadCallsDate(managerId: number){
        this.store.dispatch(new GetCallsDatesAction({ managerId: managerId }));
    }

    createCallsDate(callsDate: ICallsDate) {
        this.store.dispatch(new CreateCallsDateAction({ callsDate: callsDate }));
    }

    editCallsDate(callsDate: ICallsDate){
        this.store.dispatch(new EditCallsDateAction({ callsDate: callsDate }));
    }


    constructor(private store: Store<ICallsDateState>){}
}