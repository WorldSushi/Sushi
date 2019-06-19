import { TypeOfDateAction } from '../enums/typeOfDateAction';

export interface ICallsDate {
    id: number,
    action: TypeOfDateAction,
    clientId: number
}