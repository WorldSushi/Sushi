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
    calls: ClientManagerCall[]
}

export interface ClientManagerCall {
    date: Date,
    duration: string,
    record: string
}