import { Injectable } from '@angular/core';
import { of, concat } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, concatMap, mergeMap, take, concatAll, last, takeLast } from 'rxjs/operators';
import { GetWorkgroupsAction, WorkgroupsActionsTypes, GetWorkgroupsSuccesAction, GetWorkgroupsFailureAction, CreateWorkgroupAction, CreateWorkgroupSuccesAction, CreateWorkgroupFailureAction, EditWorkgroupAction, EditWorkgroupSuccesAction, EditWorkgroupFailureAction, AddClientToWorkgroupAction, ChangeRegionalManagerAction, ChangeEscortManagerAction } from '../actions/workgroup.actions';
import { IWorkgroup } from 'src/app/admin/workgroups/shared/models/workgroup.model';
import { WorkgroupService } from 'src/app/admin/workgroups/shared/services/workgroup.service';


@Injectable()
export class WorkgroupsEffects {
    @Effect() 
    getWorkgroupWorkgroups$ = this.actions$.pipe(
        ofType<GetWorkgroupsAction>(WorkgroupsActionsTypes.GET_WORKGROUPS),
        switchMap((action) =>
            this.workgroupsService.getWorkgroups().pipe(
                map((workgroups: IWorkgroup[]) =>
                    new GetWorkgroupsSuccesAction({ workgroups: workgroups})
                ),
                catchError(error => 
                    of(new GetWorkgroupsFailureAction({ error: error }))
                )
            )
        )
    )

    @Effect()
    createWorkgroup$ = this.actions$.pipe(
        ofType<CreateWorkgroupAction>(WorkgroupsActionsTypes.CREATE_WORKGROUP),
        switchMap((action) =>
            this.workgroupsService.createWorkgroup(action.payload.workgroup).pipe(
                map((workgroup: IWorkgroup) =>
                    new CreateWorkgroupSuccesAction({ workgroup: workgroup })
                ),
                catchError(error => 
                    of(new CreateWorkgroupFailureAction({ error: error }))
                )
            )
        )
    )
    
    @Effect()
    editWorkgroup$ = this.actions$.pipe(
        ofType<EditWorkgroupAction>(WorkgroupsActionsTypes.EDIT_WORKGROUP),
        switchMap((action) =>
            this.workgroupsService.editWorkgroup(action.payload.workgroup).pipe(
                map((workgroup: IWorkgroup) =>
                    new EditWorkgroupSuccesAction({ workgroup: workgroup}) 
                ),
                catchError(error =>
                    of(new EditWorkgroupFailureAction({ error: error}))
                )
            )    
        )
    )

    @Effect()
    addClientToWorkgroup$ = this.actions$.pipe(
        ofType<AddClientToWorkgroupAction>(WorkgroupsActionsTypes.ADD_CLIENT_TO_WORKGROUP),
        concatMap((action) => 
            this.workgroupsService.addClientToWorkgroup(action.payload).pipe(
                map((workgroup: IWorkgroup) => 
                    new EditWorkgroupSuccesAction({ workgroup: workgroup })
                ),
                catchError(error => of(new EditWorkgroupFailureAction({ error: error })))
            )
        )
    )

    @Effect()
    changeRegionalManager$ = this.actions$.pipe(
        ofType<ChangeRegionalManagerAction>(WorkgroupsActionsTypes.CHANGE_REGIONAL_MANAGER),
        concatMap((action) => 
            this.workgroupsService.changeRegionalManager(action.payload).pipe(
                map((workgroup: IWorkgroup) => {
                    return new EditWorkgroupSuccesAction({ workgroup: workgroup })
                }
                    
                ),
                catchError(error => of(new EditWorkgroupFailureAction({ error: error })))
            )
        )
    )

    @Effect()
    changeEscortManager$ = this.actions$.pipe(
        ofType<ChangeEscortManagerAction>(WorkgroupsActionsTypes.CHANGE_ESCORT_MANAGER),
        concatMap((action) => 
            this.workgroupsService.changeEscortManager(action.payload).pipe(
                map((workgroup: IWorkgroup) => 
                    new EditWorkgroupSuccesAction({ workgroup: workgroup })
                ),
                catchError(error => of(new EditWorkgroupFailureAction({ error: error })))
            )
        )
    )

    constructor(
        private workgroupsService: WorkgroupService,
        private actions$: Actions
    ) {}
}
