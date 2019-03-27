import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { AuthComponent } from './containers/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { AuthorizeService } from './services/authorize.service';

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthorizeService
  ]
})
export class AccountModule { }
