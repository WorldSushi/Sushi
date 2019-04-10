import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ManagerService } from '../../services/manager.service';
import { GetAll, ManagerActionTypes, GetAllSuccess } from "../actions/user.action";
import { Manager } from "../../models/manager.model";

@Injectable()
export class ManagerEffects {
    @Effect()
    getManagers$ = this.actions$.pipe(
        ofType<GetAll>(ManagerActionTypes.GET_ALL),
        switchMap(() => this.managerService.getManagers()),
        switchMap((managers: Manager[]) => of(new GetAllSuccess({managers: managers})) )
    )

    constructor(
        private managerService: ManagerService,
        private actions$: Actions,
    ){}
}

