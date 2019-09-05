import { TypeOfDateAction } from '../enums/typeOfDateAction';

export interface ICallsDate {
    id: number,
    contactType: TypeOfDateAction,
    clientId: number,
    date: any,
    managerType: number,
    managerId: number,
  durations: number,
  isAccept: boolean
}
