import { ICallPlan } from './call-plan.model';
import { ITripPlan } from './trip-plan.model';

import { IRevenueAnalysis } from './revenue-analysis';
import { INomenclatureAnalysis } from './nomenclature-analysis';
import { IWeekPlan } from './week-plan.model';
import { IManagerCallsResult } from './Manager-calls-result.model';
import { ICallsDate } from './calls-date.model';

export interface IClient {
    id: number,
    title: string,
    type: number,
    numberOfCalls: number,
    numberOfShipments: number,
    callPlan?: ICallPlan,
    tripPlan?: ITripPlan,
    nomenclatureAnalysis: INomenclatureAnalysis,
    revenueAnalysis: IRevenueAnalysis,
    weekPlans: IWeekPlan[],
    MSresults: IManagerCallsResult,
    RMresults: IManagerCallsResult,
    MSCallsDates: ICallsDate[],
    RMCallsDates: ICallsDate[],
    managerId: number
}