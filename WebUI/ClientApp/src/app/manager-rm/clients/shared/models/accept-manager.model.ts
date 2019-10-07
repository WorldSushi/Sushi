import { ClientAccept } from './client-accep.modelt';

export interface AcceptManager {
  id: number,
  login: string,
  phone: string,
  callsDate: ClientAccept[]
}
