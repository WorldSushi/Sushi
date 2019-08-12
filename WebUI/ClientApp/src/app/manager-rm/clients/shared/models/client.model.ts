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
    clientType: number,
    numberOfCalls: number,
    numberOfShipments: number,
    group: number,
    callPlan?: ICallPlan,
    tripPlan?: ITripPlan,
    nomenclatureAnalysis: INomenclatureAnalysis,
    revenueAnalysis: IRevenueAnalysis,
    weekPlans: IWeekPlan[],
    MSresults: IManagerCallsResult,
    RMresults: IManagerCallsResult,
    clientContacts: ICallsDate[],
    hasWorkgroup: boolean,
    phones: any[]
}