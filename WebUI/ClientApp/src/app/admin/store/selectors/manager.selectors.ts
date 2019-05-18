import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IManagerState } from '../states/manager.state';
import { IAdminState } from '../states';
import { IAppState } from 'src/app/store/states';
import { selectAdminState } from '.';

const selectManagerState = createSelector(
    selectAdminState,
    (state: IAdminState) => state.managerState);

export const selectManagerList = createSelector(
    selectManagerState,
    (state: IManagerState) => state.managers);