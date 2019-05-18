import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { LoadAuthsFailure, LoadAuthsSuccess, AuthActionTypes, AuthActions } from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';



@Injectable()
export class AuthEffects {

  @Effect()
  loadAuths$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoadAuths),
    switchMap((action) =>
      this.authService.getAuthorization(action.payload.data)
        .pipe(
          map(data => new LoadAuthsSuccess({ data })),
          catchError(error => of(new LoadAuthsFailure({ error }))))
    )
  );


  constructor(private actions$: Actions<AuthActions>, private authService: AuthService) {}

}
