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
            return state.clients.map(client => {
                return {
                    ...client,
                    callPlan: callPlans.find(item => item.clientId == client.id) 
                        ? callPlans.find(item => item.clientId == client.id) 
                        : { 
                            id: 0, 
                            totalCalls: client.numberOfCalls / 10 == 90 ? 9 : client.numberOfCalls / 10,
                            escortManagerCalls: 0,
                            regionalManagerCalls: client.numberOfCalls / 10 == 90 ? 9 : client.numberOfCalls / 10,
                            clientId: client.id
                        },
                    managerCallsResults: managerCallsResults.find(item => item.clientId == client.id) 
                        ? managerCallsResults.find(item => item.clientId == client.id) 
                        : {
                            id: 0,
                            escortCalls: 0,
                            escortMails: 0,
                            escortLetters: 0,
                            escortTotalContacts: 0,
                            regionalCalls: 0,
                            regionalMails: 0,
                            regionalLetters: 0,
                            regionalTotalContacts: 0,
                            clientId: client.id
                        },
                    nomenclatureAnalysis: nomenclatureAnalyzes.find(item => item.clientId == client.id),
                    revenueAnalysis: revenueAnalyzes.find(item => item.clientId == client.id),
                    tripPlan: tripPlans.find(item => item.clientId == client.id) ? tripPlans.find(item => item.clientId == client.id) : {
                        id: 0,
                        hours: 0,
                        completedType: 0,
                        clientId: client.id
                    },
                    weekPlans: weekPlans.filter(item => item.clientId == client.id) ? weekPlans.filter(item => item.clientId == client.id) : [],
                    clientContacts: callsDates.filter(item => item.clientId == client.id) ? callsDates.filter(item => item.clientId == client.id) : []
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