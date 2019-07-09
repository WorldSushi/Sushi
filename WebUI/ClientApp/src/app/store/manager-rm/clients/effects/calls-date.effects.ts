import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';
import { GetCallsDatesAction, CallsDateActionsTypes, GetCallsDatesSuccesAction, GetCallsDatesFailureAction, CreateCallsDateAction, CreateCallsDateSuccesAction, CreateCallsDateFailureAction, EditCallsDateAction, EditCallsDateSuccesAction, EditCallsDateFailureAction } from '../actions/calls-date.actions';
import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';
import { CallsDatesService } from 'src/app/manager-rm/clients/shared/services/calls-date.service';
import { ManagerCallsResultsService } from 'src/app/manager-rm/clients/shared/services/manager-calls-result.service';
import { ManagerCallsResultFacade } from '../facades/manager-calls-result.facade';


@Injectable()
export class CallsDatesEffects {
    @Effect() 
    getCallsDates$ = this.actions$.pipe(
        ofType<GetCallsDatesAction>(CallsDateActionsTypes.GET_CALLS_DATES),
        concatMap((action) =>
            this.callsDatesService.getCallsDates(action.payload.managerId).pipe(
                map((callsDates: ICallsDate[]) =>
                    new GetCallsDatesSuccesAction({ callsDates: callsDates})
                ),
                catchError(error => 
                    of(new GetCallsDatesFailureAction({ error: error }))
                )
            )
        )
    )

    @Effect()
    createCallsDate$ = this.actions$.pipe(
        ofType<CreateCallsDateAction>(CallsDateActionsTypes.CREATE_CALLS_DATE),
        concatMap((action) =>
            this.callsDatesService.createCallsDate(action.payload.callsDate).pipe(
                map((callsDate: ICallsDate) =>{
                    this.managerCallsResultFacade.loadManagerCallsResult(1);
                    return new CreateCallsDateSuccesAction({ callsDate: callsDate })
                }
                   
                ),
                catchError(error => 
                    of(new CreateCallsDateFailureAction({ error: error }))
                )
            )
        )
    )
    
    @Effect()
    editCallsDate$ = this.actions$.pipe(
        ofType<EditCallsDateAction>(CallsDateActionsTypes.EDIT_CALLS_DATE),
        concatMap((action) =>
            this.callsDatesService.editCallsDate(action.payload.callsDate).pipe(
                map((callsDate: ICallsDate) =>
                    new EditCallsDateSuccesAction({ callsDate: callsDate}) 
                ),
                catchError(error =>
                    of(new EditCallsDateFailureAction({ error: error}))
                )
            )    
        )
    )

    constructor(
        private callsDatesService: CallsDatesService,
        private managerCallsResultFacade: ManagerCallsResultFacade, 
        private actions$: Actions
    ) {}
}