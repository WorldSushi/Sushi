import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { GetManagersAction, ManagersActionsTypes, GetManagersSuccesAction, GetManagersFailureAction, CreateManagerAction, CreateManagerSuccesAction, CreateManagerFailureAction, EditManagerAction, EditManagerSuccesAction, EditManagerFailureAction } from '../actions/manager.actions';

import { ManagerService } from 'src/app/admin/managers/shared/services/manager.service';
import { IManager } from 'src/app/admin/managers/shared/models/manager.model';

@Injectable()
export class ManagersEffects {
    @Effect() 
    getManagerManagers$ = this.actions$.pipe(
        ofType<GetManagersAction>(ManagersActionsTypes.GET_MANAGERS),
        switchMap((action) =>
            this.managersService.getManagers().pipe(
                map((managers: IManager[]) =>
                    new GetManagersSuccesAction({ managers: managers})
                ),
                catchError(error => 
                    of(new GetManagersFailureAction({ error: error }))
                )
            )
        )
    )

    @Effect()
    createManager$ = this.actions$.pipe(
        ofType<CreateManagerAction>(ManagersActionsTypes.CREATE_MANAGER),
        switchMap((action) =>
            this.managersService.createManager(action.payload.manager).pipe(
                map((manager: IManager) =>
                    new CreateManagerSuccesAction({ manager: manager })
                ),
                catchError(error => 
                    of(new CreateManagerFailureAction({ error: error }))
                )
            )
        )
    )
    
    @Effect()
    editManager$ = this.actions$.pipe(
        ofType<EditManagerAction>(ManagersActionsTypes.EDIT_MANAGER),
        switchMap((action) =>
            this.managersService.editManager(action.payload.manager).pipe(
                map((manager: IManager) =>
                    new EditManagerSuccesAction({ manager: manager}) 
                ),
                catchError(error =>
                    of(new EditManagerFailureAction({ error: error}))
                )
            )    
        )
    )

    constructor(
        private managersService: ManagerService,
        private actions$: Actions
    ) {}
}