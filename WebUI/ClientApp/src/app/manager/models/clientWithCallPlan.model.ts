export interface ClientWithCallPlan {
    id: number,
    title: string,
    phone: string,
    plannedAmountCalls: number,
    amountCalls: number,
    plannedAmountTrips: number,
    amountTrips: number,
    businessTripCompletedType: number
}