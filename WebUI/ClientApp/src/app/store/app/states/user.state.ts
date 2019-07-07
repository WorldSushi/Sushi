import { IUser } from 'src/app/shared/models/user.model';

export interface IUserState {
    currentUser: IUser,
    loading: boolean,
    error: any
}

export const userInitalState = {
    currentUser: null,
    loading: false,
    error: null
}