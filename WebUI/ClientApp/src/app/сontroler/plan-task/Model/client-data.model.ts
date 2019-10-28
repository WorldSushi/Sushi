import { IWeekPlan } from '../../../manager-rm/clients/shared/models/week-plan.model';

export interface IClientData {
  id: number,
  workGroupeId: number,
  title: string,
  legalEntity: string,
  weeklyPlanSRegional: IWeekPlan,
  weeklyPlanSEscort: IWeekPlan
}
