import { IManagerCallsResult } from 'src/app/manager-rm/clients/shared/models/Manager-calls-result.model';

export interface IManagerCallsResultState {
    managerCallsResults: IManagerCallsResult[],
    loading: boolean,
    error: any
}

export const managerCallsResultInitialState = {
    managerCallsResults: [],
    error: null,
    loading: false
}
