import { ManagersActionUnion, ManagersActionsTypes } from '../actions/manager.actions';
import { IManagersState, managersInitialState } from '../states/managers.state';


export function managerReducer(state = managersInitialState, action: ManagersActionUnion): IManagersState {
    
        switch(action.type) {
                case ManagersActionsTypes.GET_MANAGERS: 
                        return {
                                ...state,
                                loading: true
                        }
                
                case ManagersActionsTypes.GET_MANAGERS_SUCCESS:
                        return {
                                ...state,
                                managers: action.payload.managers,
                                loading: false
                        }
                
                case ManagersActionsTypes.GET_MANAGERS_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }

                case ManagersActionsTypes.CREATE_MANAGER_SUCCESS:
                        return {
                                ...state,
                                managers: [...state.managers, action.payload.manager],
                                loading: false
                        }
                
                case ManagersActionsTypes.CREATE_MANAGER_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }
                
                case ManagersActionsTypes.EDIT_MANAGER_SUCCESS:
                        const index = state.managers.findIndex(item => item.id == action.payload.manager.id);
                        
                        return {
                                ...state,
                                managers: [
                                        ...state.managers.slice(0, index),
                                        action.payload.manager,
                                        ...state.managers.slice(index + 1)
                                ],
                                loading: false
                        }
                
                case ManagersActionsTypes.EDIT_MANAGER_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }              

                default: 
                        return state;
        }

    
}