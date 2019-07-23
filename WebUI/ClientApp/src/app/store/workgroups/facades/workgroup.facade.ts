import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { workgroupsQueries } from '../selectors/workgroup.selectors';
import { GetWorkgroupsAction, CreateWorkgroupAction, EditWorkgroupAction, AddClientToWorkgroupAction, ChangeRegionalManagerAction, ChangeEscortManagerAction } from '../actions/workgroup.actions';
import { IWorkgroup } from 'src/app/admin/workgroups/shared/models/workgroup.model';
import { IWorkgroupsState } from '../states/workgroup.state';


@Injectable()
export class WorkgroupsFacade {
    workgroups$ = this.store.select(workgroupsQueries.selectWorkgroups);
    loading$ = this.store.select(workgroupsQueries.selectLoadingStatus);
    error$ = this.store.select(workgroupsQueries.selectError);

    loadWorkgroups(){
        this.store.dispatch(new GetWorkgroupsAction());
    }

    createWorkgroup(workgroup: IWorkgroup) {
        this.store.dispatch(new CreateWorkgroupAction({ workgroup: workgroup }));
    }

    editWorkgroup(workgroup: IWorkgroup){
        this.store.dispatch(new EditWorkgroupAction({ workgroup: workgroup }));
    }

    addClientToWorkgroup(data){
        this.store.dispatch(new AddClientToWorkgroupAction(data));
    }

    changeRegionalManager(data){
        this.store.dispatch(new ChangeRegionalManagerAction(data));
    }

    changeEscortManager(data){
        this.store.dispatch(new ChangeEscortManagerAction(data));
    }


    constructor(private store: Store<IWorkgroupsState>){}
}