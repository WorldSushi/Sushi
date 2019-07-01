import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { GetManagerCallsResultsAction, CreateManagerCallsResultAction, EditManagerCallsResultAction } from '../actions/manager-calls-result.actions';
import { IManagerCallsResult } from 'src/app/manager-rm/clients/shared/models/Manager-calls-result.model';
import { IManagerCallsResultState } from '../states/manager-calls-result.state';
import { managerCallsResultQueries } from '../selectors/manager-calls-result.selectors';



@Injectable()
export class ManagerCallsResultFacade {
    managerCallsResult$ = this.store.select(managerCallsResultQueries.selectManagerCallsResults);
    loading$ = this.store.select(managerCallsResultQueries.selectLoadingStatus);
    error$ = this.store.select(managerCallsResultQueries.selectError);

    loadManagerCallsResult(managerId: number){
        this.store.dispatch(new GetManagerCallsResultsAction({ managerId: managerId }));
    }

    createManagerCallsResult(managerCallsResult: IManagerCallsResult) {
        this.store.dispatch(new CreateManagerCallsResultAction({ managerCallsResult: managerCallsResult }));
    }

    editManagerCallsResult(managerCallsResult: IManagerCallsResult){
        this.store.dispatch(new EditManagerCallsResultAction({ managerCallsResult: managerCallsResult }));
    }


    constructor(private store: Store<IManagerCallsResultState>){}
}