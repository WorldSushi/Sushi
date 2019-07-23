import { createSelector, MemoizedSelector, createFeatureSelector } from '@ngrx/store';
import { IAppState } from '../states';
import { IUserState } from '../states/user.state';


const selectUserState = createFeatureSelector<IUserState>('user');


export const selectCurrentUser = createSelector(
    selectUserState,
    (state: IUserState) => state.currentUser ? state.currentUser : null
)



export const userQueries = {
    selectCurrentUser
} 