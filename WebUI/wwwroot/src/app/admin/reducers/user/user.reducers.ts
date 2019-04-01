import { User } from '../../models/user/user.models';
import { Action } from '@ngrx/store';
import { UserActionTypes, UserActionsUnion } from '../../actions/user/user.actions';

export interface IAdminState {
    users: User[]
}

export const initialAdminState: IAdminState = {
    users: []
}

export function adminReducer(state = initialAdminState, action: UserActionsUnion){
    switch (action.type){
        case UserActionTypes.GetAllComplete:
            return {...this.state, users: action.payload};
        default: 
            return state;
    }
}