import { ActionReducerMap } from '@ngrx/store';
import { IWorkgroupsModuleState } from '../states/workgroup-module.state';
import { workgroupReducer } from './workgroup.reducer';


export const workgroupsModuleReducers: ActionReducerMap<IWorkgroupsModuleState> = {
    workgroupsState: workgroupReducer,
}