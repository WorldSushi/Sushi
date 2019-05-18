import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './containers/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    AuthRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
