import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ManagerService } from '../../services/manager.service';
import { GetAll, ManagerActionTypes, GetAllSuccess, CreateManager, CreateManagerSuccess, CreateManagerFailure, UpdateManager, UpdateManagerSuccess, UpdateManagerFailure, DeleteManager, DeleteManagerSuccess, DeleteManagerFailure } from "../actions/user.action";
import { Manager } from "../../models/manager.model";

@Injectable()
export class ManagerEffects {
    @Effect()
    getManagers$ = this.actions$.pipe(
        ofType<GetAll>(ManagerActionTypes.GET_ALL),
        switchMap(() => this.managerService.getManagers()),
        switchMap((managers: Manager[]) => of(new GetAllSuccess({managers: managers})))
    )

    @Effect()
    createManager$ = this.actions$.pipe(
        ofType<CreateManager>(ManagerActionTypes.CREATE_MANAGER),
        switchMap((action) => this.managerService.createManager(action.payload.data)),
        switchMap((manager: Manager) => of(new CreateManagerSuccess({data: manager}))),
        catchError((error: any) => of(new CreateManagerFailure({error: error})))
    )

    @Effect()
    updateManager$ = this.actions$.pipe(
        ofType<UpdateManager>(ManagerActionTypes.UPDATE_MANAGER),
        switchMap((action) => this.managerService.updateManager(action.payload.data)),
        switchMap((manager: Manager) => of(new UpdateManagerSuccess({data: manager}))),
        catchError((error: any) => of(new UpdateManagerFailure({error: error})))
    )

    @Effect()
    deleteManager$ = this.actions$.pipe(
        ofType<DeleteManager>(ManagerActionTypes.DELETE_MANAGER),
        switchMap((action) => this.managerService.deleteManager(action.payload.data)),
        switchMap((id: number) => of(new DeleteManagerSuccess({data: id}))),
        catchError((error: any) => of(new DeleteManagerFailure({error: error})))
    )


    constructor(
        private managerService: ManagerService,
        private actions$: Actions,
    ){}
}

