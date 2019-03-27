import { User } from '../../models/user/user.models';
import { Action } from '@ngrx/store';
import { ActionTypes, AdminActionsUnion } from '../../actions/user/user.actions';

export interface AdminState {
    users: User[]
}

export const initialState: AdminState = {
    users: []
}

export function adminReducer(state = initialState, action: AdminActionsUnion){
    switch (action.type){
        case ActionTypes.GetAllComplete:
            return {...this.state, users: action.payload};
        default: 
            return state;
    }
}