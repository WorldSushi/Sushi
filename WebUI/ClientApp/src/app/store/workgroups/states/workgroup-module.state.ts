import { IWorkgroupsState, workgroupsInitialState } from './workgroup.state';

export interface IWorkgroupsModuleState {
    workgroupsState: IWorkgroupsState
}

export const workgroupsModuleInitalState = {
    workgroupsState: workgroupsInitialState
}