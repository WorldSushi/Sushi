import { ICallsDate } from './calls-date.model';

export interface AcceptManager {
  id: number,
  login: string,
  phone: string,
  callsDate: ICallsDate[]
}
