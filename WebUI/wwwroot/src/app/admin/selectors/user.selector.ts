import { IAdminState } from "../reducers/user/user.reducers";
import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/reducers';

const selectUsers = (state: IAppState) => state.admin;

export const selectUserList = createSelector(
    selectUsers, 
    (state: IAdminState) => state.users
)