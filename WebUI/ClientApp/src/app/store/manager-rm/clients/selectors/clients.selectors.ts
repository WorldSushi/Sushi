import { createSelector } from '@ngrx/store';
import { selectClientsState } from '.';
import { IClientsState } from '../states/clients.state';
import { selectCallPlans } from './call-plan.selectors';
import { selectManagerCallsResults } from './manager-calls-result.selectors';
import { selectNomenclatureAnalyzes } from './nomenclature-analysis.selectors';
import { selectRevenueAnalyzes } from './revenue-analysis.selectors';
import { selectTripPlans } from './trip-plan.selectors';
import { selectWeekPlans } from './week-plan.selectors';
import { ICallPlan } from 'src/app/manager-rm/clients/shared/models/call-plan.model';
import { IManagerCallsResult } from 'src/app/manager-rm/clients/shared/models/Manager-calls-result.model';
import { INomenclatureAnalysis } from 'src/app/manager-rm/clients/shared/models/nomenclature-analysis';
import { IRevenueAnalysis } from 'src/app/manager-rm/clients/shared/models/revenue-analysis';
import { ITripPlan } from 'src/app/manager-rm/clients/shared/models/trip-plan.model';
import { IWeekPlan } from 'src/app/manager-rm/clients/shared/models/week-plan.model';
import { selectCallsDates } from './calls-date.selectors';
import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';

export const selectClients = createSelector(
    selectClientsState,
    selectCallPlans,
    selectManagerCallsResults,
    selectNomenclatureAnalyzes,
    selectRevenueAnalyzes,
    selectTripPlans,
    selectWeekPlans,
    selectCallsDates,
    (state: IClientsState,
        callPlans: ICallPlan[],
        managerCallsResults: IManagerCallsResult[],
        nomenclatureAnalyzes: INomenclatureAnalysis[],
        revenueAnalyzes: IRevenueAnalysis[],
        tripPlans: ITripPlan[],
        weekPlans: IWeekPlan[],
        callsDates: ICallsDate[]) => {
            if(callPlans.length == 0 || managerCallsResults.length == 0 || tripPlans.length == 0 || weekPlans.length == 0 || callsDates.length == 0)
                return

            return state.clients.map(client => {
                return {
                    ...client,
                    callPlan: callPlans.find(item => item.clientId == client.id),
                    managerCallsResults: managerCallsResults.find(item => item.clientId == client.id),
                    nomenclatureAnalysis: nomenclatureAnalyzes.find(item => item.clientId == client.id),
                    revenueAnalysis: revenueAnalyzes.find(item => item.clientId == client.id),
                    tripPlan: tripPlans.find(item => item.clientId == client.id),
                    weekPlans: weekPlans.filter(item => item.clientId == client.id),
                    clientContacts: callsDates.filter(item => item.clientId == client.id)
                }
            })
        } 
        
        
)

export const selectLoadingStatus = createSelector(
    selectClientsState,
    (state: IClientsState) => state.loading
)

export const selectError = createSelector(
    selectClientsState,
    (state: IClientsState) => state.error
)

export const clientsQueries = {
    selectClients,
    selectLoadingStatus,
    selectError
} 