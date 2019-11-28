import { TypeOfDateAction } from '../enums/typeOfDateAction';
import { CallsComment } from '../../../../сontroler/Calls/shared/models/сalls-сomment.model';

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
  direction: string,
  phone: string,
    callsComments: CallsComment,
    statusContact: number
}
