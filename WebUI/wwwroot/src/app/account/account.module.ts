import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AuthComponent } from './containers/auth/auth.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
