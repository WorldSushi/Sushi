import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ClientService } from '../../services/client.service';
import { GetAll, ClientActionTypes, GetAllSuccess, CreateClient, CreateClientSuccess, CreateClientFailure, UpdateClient, UpdateClientSuccess, UpdateClientFailure, DeleteClient, DeleteClientSuccess, DeleteClientFailure } from '../actions/client.action';
import { switchMap, catchError } from 'rxjs/operators';
import { Client } from '../../models/client.model';
import { of } from 'rxjs';

@Injectable()
export class ClientEffects {
    @Effect()
    getClients$ = this.actions$.pipe(
        ofType<GetAll>(ClientActionTypes.GET_ALL),
        switchMap(() => this.clientService.getClients()),
        switchMap((clients: Client[]) => of(new GetAllSuccess({clients: clients})))
    )

    @Effect()
    createClient$ = this.actions$.pipe(
        ofType<CreateClient>(ClientActionTypes.CREATE_CLIENT),
        switchMap((action) => this.clientService.createClient(action.payload.data)),
        switchMap((client: Client) => of(new CreateClientSuccess({data: client}))),
        catchError((error: any) => of(new CreateClientFailure({error: error})))
    )

    @Effect()
    updateClient$ = this.actions$.pipe(
        ofType<UpdateClient>(ClientActionTypes.UPDATE_CLIENT),
        switchMap((action) => this.clientService.updateClient(action.payload.data)),
        switchMap((client: Client) => of(new UpdateClientSuccess({data: client}))),
        catchError((error: any) => of(new UpdateClientFailure({error: error})))
    )

    @Effect()
    deleteManager$ = this.actions$.pipe(
        ofType<DeleteClient>(ClientActionTypes.DELETE_CLIENT),
        switchMap((action) => this.clientService.deleteClient(action.payload.data)),
        switchMap((id: number) => of(new DeleteClientSuccess({data: id}))),
        catchError((error: any) => of(new DeleteClientFailure({error: error})))
    )

    constructor(
        private clientService: ClientService,
        private actions$: Actions
    ) {}


}