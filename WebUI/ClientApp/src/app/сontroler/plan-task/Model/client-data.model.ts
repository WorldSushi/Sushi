import { IWeekPlan } from '../../../manager-rm/clients/shared/models/week-plan.model';
import { ClientAccept } from '../../../manager-rm/clients/shared/models/client-accep.modelt';

export interface IClientData {
  id: number,
  workGroupeId: number,
  title: string,
  legalEntity: string,
  weeklyPlanSRegional: IWeekPlan,
  weeklyPlanSEscort: IWeekPlan,
  clientAccept: ClientAccept[]
}
