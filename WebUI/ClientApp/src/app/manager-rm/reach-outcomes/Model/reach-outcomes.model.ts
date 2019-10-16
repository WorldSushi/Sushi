import { IWeekPlan } from '../../clients/shared/models/week-plan.model';

export interface ReachOutcomes {
  clientId: string,
  nameClient: string,
  phones: any[],
  contactName: string,
  position: string,
  focusProducts: string,
  resultFridays: any[]
  weekPlansReg : IWeekPlan,
  weekPlansEsc: IWeekPlan,
}
