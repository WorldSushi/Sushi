import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';
import { GetManagerCallsResultsAction, ManagerCallsResultActionsTypes, GetManagerCallsResultsSuccesAction, GetManagerCallsResultsFailureAction, CreateManagerCallsResultAction, CreateManagerCallsResultSuccesAction, CreateManagerCallsResultFailureAction, EditManagerCallsResultAction, EditManagerCallsResultSuccesAction, EditManagerCallsResultFailureAction } from '../actions/manager-calls-result.actions';
import { IManagerCallsResult } from 'src/app/manager-rm/clients/shared/models/Manager-calls-result.model';
import { ManagerCallsResultsService } from 'src/app/manager-rm/clients/shared/services/manager-calls-result.service';



@Injectable()
export class ManagerCallsResultsEffects {
    @Effect() 
    getManagerCallsResults$ = this.actions$.pipe(
        ofType<GetManagerCallsResultsAction>(ManagerCallsResultActionsTypes.GET_MANAGER_CALLS_RESULTS),
        concatMap((action) =>
            this.managerCallsResultsService.getManagerCallsResults(action.payload.managerId).pipe(
                map((managerCallsResults: IManagerCallsResult[]) =>
                    new GetManagerCallsResultsSuccesAction({ managerCallsResults: managerCallsResults})
                ),
                catchError(error => 
                    of(new GetManagerCallsResultsFailureAction({ error: error }))
                )
            )
        )
    )

    @Effect()
    createManagerCallsResult$ = this.actions$.pipe(
        ofType<CreateManagerCallsResultAction>(ManagerCallsResultActionsTypes.CREATE_MANAGER_CALLS_RESULT),
        concatMap((action) =>
            this.managerCallsResultsService.createManagerCallsResult(action.payload.managerCallsResult).pipe(
                map((managerCallsResult: IManagerCallsResult) =>
                    new CreateManagerCallsResultSuccesAction({ managerCallsResult: managerCallsResult })
                ),
                catchError(error => 
                    of(new CreateManagerCallsResultFailureAction({ error: error }))
                )
            )
        )
    )
    
    @Effect()
    editManagerCallsResult$ = this.actions$.pipe(
        ofType<EditManagerCallsResultAction>(ManagerCallsResultActionsTypes.EDIT_MANAGER_CALLS_RESULT),
        concatMap((action) =>
            this.managerCallsResultsService.editManagerCallsResult(action.payload.managerCallsResult).pipe(
                map((managerCallsResult: IManagerCallsResult) =>
                    new EditManagerCallsResultSuccesAction({ managerCallsResult: managerCallsResult}) 
                ),
                catchError(error =>
                    of(new EditManagerCallsResultFailureAction({ error: error}))
                )
            )    
        )
    )

    constructor(
        private managerCallsResultsService: ManagerCallsResultsService,
        private actions$: Actions
    ) {}
}