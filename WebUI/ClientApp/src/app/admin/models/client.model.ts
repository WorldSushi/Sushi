export interface Client {
    id: number,
    title: string,
    phone: string,
    legalEntity: string,
    clientType: string,
    numberOfCalls: string,
    plannedAmountCalls: number,
    amountCalls: number,
    managers: ClientManager[]
}

export interface ClientManager {
    id: number,
    login: string,
    amountCalls: number,
    plannedAmountCalls: number,
    calls: ClientManagerCall[],
    weekPlans: ClientManagerWeekPlan[]
}

export interface ClientManagerCall {
    date: Date,
    duration: string,
    record: string
}

export interface ClientManagerWeekPlan {
    date: Date,
    weekNumber: number,
    plan: string,
    fact: string
}