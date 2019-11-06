import { TypeOfDateAction } from '../enums/typeOfDateAction';
import { CallsComment } from '../../../../сontroler/Calls/shared/models/сalls-сomment.model';

export interface ICallsDate {
    id: number,
    contactType: TypeOfDateAction,
    clientId: number,
    date: any,
    managerType: number,
    managerId: number,
  durations: number,
  statusContact: number

}
