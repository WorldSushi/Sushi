import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';
import { ICallPlan } from '../../../../manager-rm/clients/shared/models/call-plan.model';

export interface IWorkgroupCalls {
    clientId: number,
    clientTitle: string,
    clientType: number,
  clientActions: ICallsDate[],
  planCall: ICallPlan,
  nameWorkGroup: string,
}
