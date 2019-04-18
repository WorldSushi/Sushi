import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { IAppState } from '../../store/states';
import { IUser } from '../models/user.model';

export interface AuthState extends IAppState {
    user: IUser,
    error: any
}

export const initialAuthState: AuthState = {
    user: null,
    error: null
};

export function reducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {

    case AuthActionTypes.LoadAuths:
      return state;

    case AuthActionTypes.LoadAuthsSuccess:
      return {
        ...state,
        user: action.payload.data
      };

    case AuthActionTypes.LoadAuthsFailure:
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
}
