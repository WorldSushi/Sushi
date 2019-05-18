import { GetAllClients, GetAllSuccess, ClientActionTypes } from '../actions/client.action';
import { Client } from '../../models/client.model';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { CLientService } from '../../services/client.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ClientEffects{
    @Effect()
    getClients$ = this.actions$.pipe(
        ofType<GetAllClients>(ClientActionTypes.GET_ALL),
        switchMap(() => this.clientService.getClients()),
        switchMap((clients: Client[]) => of(new GetAllSuccess({clients: clients})))
    )

    constructor(
        private clientService: CLientService,
        private actions$: Actions
    ) {}
}