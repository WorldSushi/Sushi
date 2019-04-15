import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ClientService } from '../../services/client.service';
import { GetAll, ClientActionTypes, GetAllSuccess } from '../actions/client.action';
import { switchMap } from 'rxjs/operators';
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

    constructor(
        private clientService: ClientService,
        private actions$: Actions
    ) {}
}