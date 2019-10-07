import { acceptControlerCalss } from '../enums/accept-controler-calss';

export interface CallsComment {
    сlientId: number,
    сontactClientId: number,
    Comment: string,
    maanagerComment: string,
    acceptControlerCalss: acceptControlerCalss
}
