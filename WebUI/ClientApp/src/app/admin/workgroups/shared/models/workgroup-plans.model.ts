import { IWeekPlan } from 'src/app/manager-rm/clients/shared/models/week-plan.model';

export interface IWorkgroupPlans {
    clientId: number,
    clientTitle: string,
    clientType: number,
    escortManagerPlans: IWeekPlan[]
    regionalManagerPlans: IWeekPlan[]
}