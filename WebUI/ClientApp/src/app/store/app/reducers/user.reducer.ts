import { IUserState, userInitalState } from '../states/user.state';
import { userActionUnion, UserActionsTypes } from '../actions/user.actions';




export function userReducer(state = userInitalState, action: userActionUnion): IUserState {
    
        switch(action.type) {
                case UserActionsTypes.GET_CURRENT_USER: 
                        return {
                                ...state,
                                loading: true
                        }
                
                case UserActionsTypes.GET_CURRENT_USER_SUCCESS:
                        return {
                                ...state,
                                currentUser: action.payload.currentUser,
                                loading: false
                        }
                
                case UserActionsTypes.GET_CURRENT_USER_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }


                default: 
                        return state;
        }

    
}