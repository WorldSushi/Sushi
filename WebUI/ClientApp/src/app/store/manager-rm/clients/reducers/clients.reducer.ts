import { clientsInitialState, IClientsState } from '../states/clients.state';
import { ClientsActionUnion, ClientsActionsTypes } from '../actions/clients.actions';


export function clientsReducer(state = clientsInitialState, action: ClientsActionUnion): IClientsState {
    
        switch(action.type) {
                case ClientsActionsTypes.GET_CLIENTS: 
                        return {
                                ...state,
                                loading: true
                        }
                
                case ClientsActionsTypes.GET_CLIENTS_SUCCESS:
                        return {
                                ...state,
                                clients: action.payload.clients,
                                loading: false
                        }
                
                case ClientsActionsTypes.GET_CLIENTS_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }

                case ClientsActionsTypes.CREATE_CLIENT_SUCCES:
                        return {
                                ...state,
                                clients: [...state.clients, action.payload.client],
                                loading: false
                        }
                
                case ClientsActionsTypes.CREATE_CLIENT_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }
                
                case ClientsActionsTypes.EDIT_CLIENT_SUCCES:
                        const index = state.clients.findIndex(item => item.id == action.payload.client.id);
                        
                        return {
                                ...state,
                                clients: [
                                        ...state.clients.slice(0, index),
                                        action.payload.client,
                                        ...state.clients.slice(index + 1)
                                ],
                                loading: false
                        }
                
                case ClientsActionsTypes.EDIT_CLIENT_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }              

                default: 
                        return state;
        }

    
}