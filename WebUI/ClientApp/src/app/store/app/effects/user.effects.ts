import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';
import { GetCurrentUserAction, UserActionsTypes, GetCurrentUserSuccesAction, GetCurrentUserFailureAction } from '../actions/user.actions';
import { UserService } from 'src/app/shared/services/user.service';
import { IUser } from 'src/app/shared/models/user.model';



@Injectable()
export class UserEffects {
    @Effect() 
    getCurrentUser$ = this.actions$.pipe(
        ofType<GetCurrentUserAction>(UserActionsTypes.GET_CURRENT_USER),
        concatMap((action) =>
            this.userService.getCurrentUser().pipe(
                map((user: IUser) =>
                    new GetCurrentUserSuccesAction({ currentUser: user})
                ),
                catchError(error => 
                    of(new GetCurrentUserFailureAction({ error: error }))
                )
            )
        )
    )


    constructor(
        private userService: UserService,
        private actions$: Actions
    ) {}
}