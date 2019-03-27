import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './containers/user/user.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [UserComponent, UserListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  providers: [
    UserService
  ]
})
export class AdminModule { }
