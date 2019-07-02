export interface ICallPlan {
    id: number,
    totalCalls: number, // Общее количество звонков
    escortManagerCalls: number, //Менеджер сопровождения количество звонков
    regionalManagerCalls: number, // Региональный менеджер количество звонков
    clientId: number
}