import { IManagersModuleState } from '../states/managers-module.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectManagersModuleState = createFeatureSelector<IManagersModuleState>('managers');

export const selectManagersState = createSelector(
    selectManagersModuleState,
    (state: IManagersModuleState) => state.managersState
)