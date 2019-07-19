import { IManager } from 'src/app/admin/managers/shared/models/manager.model';

export interface IManagersState {
    managers: IManager[],
    loading: boolean,
    error: any
}

export const managersInitialState = {
    managers: [],
    loading: false,
    error: null
}

