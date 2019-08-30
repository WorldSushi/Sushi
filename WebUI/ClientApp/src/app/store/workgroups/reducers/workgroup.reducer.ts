import { workgroupsInitialState, IWorkgroupsState } from '../states/workgroup.state';
import { WorkgroupsActionUnion, WorkgroupsActionsTypes } from '../actions/workgroup.actions';


export function workgroupReducer(state = workgroupsInitialState, action: WorkgroupsActionUnion): IWorkgroupsState {
    
        switch(action.type) {
          case WorkgroupsActionsTypes.GET_WORKGROUPS:
                        return {
                                ...state,
                                loading: true
                        }
                
          case WorkgroupsActionsTypes.GET_WORKGROUPS_SUCCESS:
                        return {
                                ...state,
                                workgroups: action.payload.workgroups,
                                loading: false
                        }
                
          case WorkgroupsActionsTypes.GET_WORKGROUPS_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }

                case WorkgroupsActionsTypes.CREATE_WORKGROUP_SUCCESS:
                        return {
                                ...state,
                                workgroups: [...state.workgroups, action.payload.workgroup],
                                loading: false
                        }
                
                case WorkgroupsActionsTypes.CREATE_WORKGROUP_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }
                
                case WorkgroupsActionsTypes.EDIT_WORKGROUP_SUCCESS:
                        const index = state.workgroups.findIndex(item => item.id == action.payload.workgroup.id);
                        
                        return {
                                ...state,
                                workgroups: [
                                        ...state.workgroups.slice(0, index),
                                        action.payload.workgroup,
                                        ...state.workgroups.slice(index + 1)
                                ],
                                loading: false
                        }
                
                case WorkgroupsActionsTypes.EDIT_WORKGROUP_FAILURE:
                        return {
                                ...state,
                                error: action.payload.error
                        }              

                default: 
                        return state;
        }

    
}
