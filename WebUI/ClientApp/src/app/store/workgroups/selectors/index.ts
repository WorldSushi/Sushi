
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IWorkgroupsModuleState } from '../states/workgroup-module.state';

export const selectWorkgroupsModuleState = createFeatureSelector<IWorkgroupsModuleState>('workgroups');

export const selectWorkgroupsState = createSelector(
    selectWorkgroupsModuleState,
    (state: IWorkgroupsModuleState) => state.workgroupsState
)