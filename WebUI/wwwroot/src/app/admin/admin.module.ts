import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './containers/user/user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { adminReducers } from './store/reducers';
import { ManagerService } from './services/manager.service';
import { EffectsModule } from '@ngrx/effects';
import { ManagerEffects } from './store/effects/manager.effects';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [UserComponent, UserListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('admin', adminReducers),
    EffectsModule.forFeature([ManagerEffects]),
    MaterialModule
  ],
  providers: [ManagerService]
})
export class AdminModule { }
