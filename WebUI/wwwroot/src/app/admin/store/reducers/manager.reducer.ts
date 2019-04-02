import { ManagerActions, ManagerActionTypes } from '../actions/user.action';
import { managerInitialState, IManagerState } from '../states/manager.state';

export function managerReducer(state = managerInitialState, action: ManagerActions): IManagerState {
    switch(action.type){
        case ManagerActionTypes.GET_ALL:
            return {
                ...state,
                error: null,
                loading: true
            };       
        case ManagerActionTypes.GET_ALL_SUCCESS:
            return {
                ...state,
                managers: action.payload.managers,
                error: null,
                loading: false
            };

        case ManagerActionTypes.GET_ALL_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            };

        default:
            return state;
    }
}