import { ICallPlan } from './call-plan.model';

export interface IClient {
    id: number,
    title: string,
    type: number,
    numberOfCalls: number,
    numberOfShipments: number,
    callPlan?: ICallPlan,
    managerId: number
}