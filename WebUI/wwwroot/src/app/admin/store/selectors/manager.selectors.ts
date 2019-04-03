import { createSelector } from '@ngrx/store';

import { IManagerState } from '../states/manager.state';
import { IAdminState } from '../states';

const selectManagerState = (state: IAdminState) => state.managerState;

export const selectManagerList = createSelector(
    selectManagerState,
    (state: IManagerState) => state.managers);