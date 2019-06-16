export interface ICallPlan {
    id: number,
    collective: number, // Общее количество звонков
    MS: number, //Менеджер сопровождения количество звонков
    RM: number, // Региональный менеджер количество звонков
    clientId: number
}