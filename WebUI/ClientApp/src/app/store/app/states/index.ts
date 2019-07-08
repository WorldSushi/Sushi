import { IUser } from 'src/app/shared/models/user.model';
import { IUserState } from './user.state';

export interface IAppState {
    userState: IUserState
}