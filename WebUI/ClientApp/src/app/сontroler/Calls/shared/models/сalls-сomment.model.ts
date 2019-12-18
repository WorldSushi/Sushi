import { acceptControlerCalss } from '../enums/accept-controler-calss';

export interface CallsComment {
    clientId: number,
    contactClientId: number,
    comment: string,
    managerComment: string,
    acceptControlerCalss: acceptControlerCalss,
    durations: number,
    date: string
    colorPen: string,
    type: string,
    weekNumber: number
}
