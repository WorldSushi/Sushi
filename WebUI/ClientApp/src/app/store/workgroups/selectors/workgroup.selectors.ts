import { createSelector } from '@ngrx/store';
import { selectWorkgroupsState } from '.';
import { IWorkgroupsState } from '../states/workgroup.state';
import { selectManagers } from '../../managers/selectors/manager.selectors';
import { IManager } from 'src/app/admin/managers/shared/models/manager.model';

export const selectWorkgroups = createSelector(
    selectWorkgroupsState,
    selectManagers,
    (state: IWorkgroupsState, managers: IManager[]) => state.workgroups.map(item => {
        return {
            ...item,
            escortManager: managers.find(manager => manager.id == item.escortManagerId),
            regionalManager: managers.find(manager => manager.id == item.regionalManagerId)
        }
    })
)

export const selectLoadingStatus = createSelector(
    selectWorkgroupsState,
    (state: IWorkgroupsState) => state.loading
)

export const selectError = createSelector(
    selectWorkgroupsState,
    (state: IWorkgroupsState) => state.error
)

export const workgroupsQueries = {
    selectWorkgroups,
    selectLoadingStatus,
    selectError
} 