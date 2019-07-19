import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';

export interface ICallsDateState {
    callsDates: ICallsDate[],
    loading: boolean,
    error: any
}

export const callsDateInitialState = {
    callsDates: [],
    error: null,
    loading: false
}
