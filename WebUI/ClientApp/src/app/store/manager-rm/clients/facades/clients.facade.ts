import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { IClientsState } from '../states/clients.state';
import { clientsQueries } from '../selectors/clients.selectors';



@Injectable()
export class ClientsFacade {
    clients$ = this.store.select(clientsQueries.selectClients);
    loading$ = this.store.select(clientsQueries.selectLoadingStatus);
    error$ = this.store.select(clientsQueries.selectError);

    loadClients(managerId: number){

    }


    constructor(private store: Store<IClientsState>){}
}