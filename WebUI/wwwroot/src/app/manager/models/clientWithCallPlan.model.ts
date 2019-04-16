import { Client } from './client.model';
import { MonthlyCallPlan } from './mothlyCallPlan.model';

export interface ClientWithCallPlan {
    client: Client,
    monthlyCallPlan: MonthlyCallPlan 
}