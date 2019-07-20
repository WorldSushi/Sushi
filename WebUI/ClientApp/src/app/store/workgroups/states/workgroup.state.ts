import { IWorkgroup } from 'src/app/admin/workgroups/shared/models/workgroup.model';

export interface IWorkgroupsState {
    workgroups: IWorkgroup[],
    loading: boolean,
    error: any
}

export const workgroupsInitialState = {
    workgroups: [],
    loading: false,
    error: null
}