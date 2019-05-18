import { clientInitialState, IClientState } from '../states/client.state';
import { ClientsActions, ClientActionTypes } from '../actions/client.action';

export function clientReducer(state = clientInitialState, action: ClientsActions): IClientState {
    switch(action.type){
        case ClientActionTypes.GET_ALL:
        return {
            ...state,
            error: null,
            loading: true
        };

        case ClientActionTypes.GET_ALL_SUCCESS:
        return {
            ...state,
            clients: action.payload.clients,
            error: null,
            loading: false
        };

        case ClientActionTypes.GET_ALL_FAILURE:
        return {
            ...state,
            error: action.payload.error,
            loading: false
        }

        case ClientActionTypes.CREATE_CLIENT_SUCCESS:
            const clients = [
                ...state.clients,
                action.payload.data
            ];

            return {
                ...state,
                clients
            }

        case ClientActionTypes.CREATE_CLIENT_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }

        case ClientActionTypes.UPDATE_CLIENT_SUCCESS:
            const index = state
                .clients
                .findIndex(item => item.id == action.payload.data.id);

            if(index >= 0){
                const clients = [
                    ...state.clients.slice(0, index),
                    action.payload.data,
                    ...state.clients.slice(index + 1)
                ];

                return {
                    ...state,
                    clients
                }
            }

            return state;

        case ClientActionTypes.UPDATE_CLIENT_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }

        case ClientActionTypes.DELETE_CLIENT_SUCCESS: 
            return {
                ...state,
                clients: state.clients.filter(item => item.id != action.payload.data)
            }

        case ClientActionTypes.DELETE_CLIENT_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }    

        default:
        return state;
    }
}