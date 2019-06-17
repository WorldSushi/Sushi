import { ICallPlan } from './call-plan.model';
import { ITripPlan } from './trip-plan.model';

export interface IClient {
    id: number,
    title: string,
    type: number,
    numberOfCalls: number,
    numberOfShipments: number,
    callPlan?: ICallPlan,
    tripPlan?: ITripPlan,
    managerId: number
}