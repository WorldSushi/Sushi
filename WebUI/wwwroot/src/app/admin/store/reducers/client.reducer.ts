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

        default:
        return state;
    }
}