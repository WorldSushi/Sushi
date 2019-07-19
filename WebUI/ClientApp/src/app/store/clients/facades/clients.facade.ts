import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { IClientsState } from '../states/clients.state';
import { clientsQueries } from '../selectors/clients.selectors';
import { GetManagerClientsAction, EditClientAction, CreateClientAction, GetAdminClientsAction } from '../actions/clients.actions';
import { IClient } from "../../../manager-rm/clients/shared/models/client.model";


@Injectable()
export class ClientsFacade {
    clients$ = this.store.select(clientsQueries.selectClients);
    loading$ = this.store.select(clientsQueries.selectLoadingStatus);
    error$ = this.store.select(clientsQueries.selectError);

    loadClientsForManager(managerId: number){
        this.store.dispatch(new GetManagerClientsAction({ managerId: managerId }));
    }

    loadClientsForAdmin(){
        this.store.dispatch(new GetAdminClientsAction());
    }

    createClient(client: IClient) {
        this.store.dispatch(new CreateClientAction({ client: client }));
    }

    editClient(client: IClient){
        this.store.dispatch(new EditClientAction({ client: client }));
    }


    constructor(private store: Store<IClientsState>){}
}