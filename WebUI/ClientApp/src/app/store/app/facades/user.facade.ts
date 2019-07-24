import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { userQueries } from '../selectors/user.selectors';
import { GetCurrentUserAction } from '../actions/user.actions';
import { IUserState } from '../states/user.state';




@Injectable()
export class UserFacade {
    currentUser$ = this.store.select(userQueries.selectCurrentUser);

    loadCurrentUser(){
        this.store.dispatch(new GetCurrentUserAction());
    }

    constructor(private store: Store<IUserState>){}

    
}