import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from 'rxjs';
import { Action } from "@ngrx/store";
import { AdminActionsUnion, ActionTypes } from '../../actions/user/user.actions';

@Injectable()
export class UserEffects {
    @Effect()
    getAll$: Observable<Action> = this.actions$.pipe(
        /*ofType(ActionTypes.G)*/);

    constructor(private actions$: Actions<AdminActionsUnion>){}
}