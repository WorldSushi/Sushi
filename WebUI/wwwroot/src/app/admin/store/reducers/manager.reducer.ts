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
        
        case ManagerActionTypes.CREATE_MANAGER_SUCCESS:
            const managers = [
                ...state.managers,
                action.payload.data
            ];

            return {
                ...state,
                managers
            }

        case ManagerActionTypes.CREATE_MANAGER_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }

        case ManagerActionTypes.UPDATE_MANAGER_SUCCESS:
            const index = state
                .managers
                .findIndex(item => item.id == action.payload.data.id);

            if(index >= 0){
                const managers = [
                    ...state.managers.slice(0, index),
                    action.payload.data,
                    ...state.managers.slice(index + 1)
                ];

                return {
                    ...state,
                    managers
                }
            }

            return state;

        case ManagerActionTypes.UPDATE_MANAGER_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }

        case ManagerActionTypes.DELETE_MANAGER_SUCCESS: 
            return {
                ...state,
                managers: state.managers.filter(item => item.id != action.payload.data)
            }

        case ManagerActionTypes.DELETE_MANAGER_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }    

        default:
            return state;
    }
}