import { IClientState } from '../states/client.state';
import { IManagerState } from '../states';
import { selectManagerState } from '.';
import { createSelector } from '@ngrx/store';
import { selectMonthlyCallPlanList } from './monthlyCallPlan.selectors';
import { Client } from '../../models/client.model';
import { MonthlyCallPlan } from '../../models/mothlyCallPlan.model';
import { ClientWithCallPlan } from '../../models/clientWithCallPlan.model';

const selectClientState = createSelector(
    selectManagerState,
    (state: IManagerState) => state.clientState);

export const selectClientList = createSelector(
    selectClientState,
    (state: IClientState) => state.clients);



export const selectClientsWithCallPlan = createSelector(
    selectClientList,
    selectMonthlyCallPlanList,
    (clients: Client[], monthlyCallPlans: MonthlyCallPlan[]) => {
        return clients.map(item => {
            let clientWithCallPlan: ClientWithCallPlan = {
                id: item.id,
                title: item.title,
                phone: item.phone,
                plannedAmountCalls: monthlyCallPlans
                    .find(x => x.clientId == item.id).amountCalls
            }
            
            return clientWithCallPlan;
        })
    }
) 
