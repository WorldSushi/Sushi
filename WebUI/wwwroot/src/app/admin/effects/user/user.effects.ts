import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from 'rxjs';
import { Action } from "@ngrx/store";
import { UserActionsUnion, UserActionTypes, GetAll, GetAllComplete } from '../../actions/user/user.actions';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { IUserHttp } from '../../models/http-models/user-http.models';

@Injectable()
export class UserEffects {
    @Effect()
    getAll$: Observable<Action> = this.actions$.pipe(
        ofType<GetAll>(UserActionTypes.GetAll),
        switchMap(() => this.userService.getAll()),
        switchMap((usersHttp: IUserHttp) => of(new GetAllComplete(usersHttp.users)))
        )        

    constructor(private actions$: Actions<UserActionsUnion>,
        private userService: UserService){}
}