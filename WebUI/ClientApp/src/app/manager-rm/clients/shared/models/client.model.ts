import { ICallPlan } from './call-plan.model';
import { ITripPlan } from './trip-plan.model';

import { IRevenueAnalysis } from './revenue-analysis';
import { INomenclatureAnalysis } from './nomenclature-analysis';

export interface IClient {
    id: number,
    title: string,
    type: number,
    numberOfCalls: number,
    numberOfShipments: number,
    callPlan?: ICallPlan,
    tripPlan?: ITripPlan,
    nomenclatureAnalysis: INomenclatureAnalysis,
    revenueAnalysis: IRevenueAnalysis
    managerId: number
}