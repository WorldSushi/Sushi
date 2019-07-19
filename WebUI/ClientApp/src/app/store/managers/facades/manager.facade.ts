import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { managersQueries } from '../selectors/manager.selectors';
import { IManager } from 'src/app/admin/managers/shared/models/manager.model';
import { CreateManagerAction, EditManagerAction, GetManagersAction } from '../actions/manager.actions';
import { IManagersState } from '../states/managers.state';


@Injectable()
export class ManagersFacade {
    managers$ = this.store.select(managersQueries.selectManagers);
    loading$ = this.store.select(managersQueries.selectLoadingStatus);
    error$ = this.store.select(managersQueries.selectError);

    loadManagers(){
        this.store.dispatch(new GetManagersAction());
    }

    createManager(manager: IManager) {
        this.store.dispatch(new CreateManagerAction({ manager: manager }));
    }

    editManager(manager: IManager){
        this.store.dispatch(new EditManagerAction({ manager: manager }));
    }


    constructor(private store: Store<IManagersState>){}
}