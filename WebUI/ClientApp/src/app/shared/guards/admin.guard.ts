import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserFacade } from 'src/app/store/app/facades/user.facade';
import { map, catchError, switchMap, skip, concatMap, tap, take, filter } from 'rxjs/operators';
import { IUserState } from 'src/app/store/app/states/user.state';
import { Store } from '@ngrx/store';
import { userQueries } from 'src/app/store/app/selectors/user.selectors';
import { GetCurrentUserAction } from 'src/app/store/app/actions/user.actions';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user.model';

@Injectable()
export class AdminGuard implements CanActivate {


    constructor(public userService: UserService, public router: Router){
        
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
       
        return this.userService.getCurrentUser()
            .pipe(
                map(res => {
                    if(res.role == 'Admin')
                        return true
                    else {
                        window.location.href = '/Account/Index';
                        return false ;
                    }
                })
            )
            
            
    }
}
