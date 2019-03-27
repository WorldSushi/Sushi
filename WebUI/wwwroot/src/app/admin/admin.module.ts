import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './containers/user/user.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserService } from './services/user.service';
import { StoreModule } from '@ngrx/store';
import { adminReducer } from './reducers/user/user.reducers';

@NgModule({
  declarations: [UserComponent, UserListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    StoreModule.forFeature('admin', adminReducer)
  ],
  providers: [
    UserService
  ]
})
export class AdminModule { }
