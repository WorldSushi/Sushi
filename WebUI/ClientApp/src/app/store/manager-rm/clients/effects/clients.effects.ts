import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GetClientsAction, ClientsActionsTypes, GetClientsSuccesAction, GetClientsFailureAction, CreateClientAction, CreateClientFailureAction, CreateClientSuccesAction, EditClientAction, EditClientSuccesAction, EditClientFailureAction } from '../actions/clients.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ClientsService } from '../../../../manager-rm/clients/shared/services/clients.service';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';

@Injectable()
export class ClientsEffects {
    @Effect() 
    getClients$ = this.actions$.pipe(
        ofType<GetClientsAction>(ClientsActionsTypes.GET_CLIENTS),
        switchMap((action) =>
            this.clientsService.getClients(action.payload.managerId).pipe(
                map((clients: IClient[]) =>
                    new GetClientsSuccesAction({ clients: clients})
                ),
                catchError(error => 
                    of(new GetClientsFailureAction({ error: error }))
                )
            )
        )
    )

    @Effect()
    createClient$ = this.actions$.pipe(
        ofType<CreateClientAction>(ClientsActionsTypes.CREATE_CLIENT),
        switchMap((action) =>
            this.clientsService.createClient(action.payload.client).pipe(
                map((client: IClient) =>
                    new CreateClientSuccesAction({ client: client })
                ),
                catchError(error => 
                    of(new CreateClientFailureAction({ error: error }))
                )
            )
        )
    )
    
    @Effect()
    editClient$ = this.actions$.pipe(
        ofType<EditClientAction>(ClientsActionsTypes.EDIT_CLIENT),
        switchMap((action) =>
            this.clientsService.editClient(action.payload.client).pipe(
                map((client: IClient) =>
                    new EditClientSuccesAction({ client: client}) 
                ),
                catchError(error =>
                    of(new EditClientFailureAction({ error: error}))
                )
            )    
        )
    )

    constructor(
        private clientsService: ClientsService,
        private actions$: Actions
    ) {}
}