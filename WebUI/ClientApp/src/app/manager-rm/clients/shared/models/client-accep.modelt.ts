import { ICallsDate } from './calls-date.model';
import { TypeOfDateAction } from '../enums/typeOfDateAction';

export interface ClientAccept {
  id: number,
  contactType: TypeOfDateAction,
  clientId: number,
  date: any,
  managerType: number,
  managerId: number,
  durations: number,
  titleClient: string,
  referenceAudioVoice: string,
  direction: string
}
