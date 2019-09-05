import { IClientAction } from './client-action.model';
import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';

export interface IWorkgroupCalls {
    clientId: number,
    clientTitle: string,
    clientType: number,
  clientActions: ICallsDate[],
  nameWorkGroup: string
}
