import { Action } from '@ngrx/store';
import { ILoginModel } from '../models/login.model';
import { IUser } from '../models/user.model';

export enum AuthActionTypes {
  LoadAuths = '[Auth] Load Auths',
  LoadAuthsSuccess = '[Auth] Load Auths Success',
  LoadAuthsFailure = '[Auth] Load Auths Failure',
}

export class LoadAuths implements Action {
  readonly type = AuthActionTypes.LoadAuths;
  constructor(public payload: {data: ILoginModel}){ }
}

export class LoadAuthsSuccess implements Action {
  readonly type = AuthActionTypes.LoadAuthsSuccess;
  constructor(public payload: { data:  IUser}) { }
}

export class LoadAuthsFailure implements Action {
  readonly type = AuthActionTypes.LoadAuthsFailure;
  constructor(public payload: { error: any }) { }
}

export type AuthActions = LoadAuths | LoadAuthsSuccess | LoadAuthsFailure;

