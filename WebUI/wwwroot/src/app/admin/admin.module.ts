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
import { AdminComponent } from './admin.component';
import { LayoutModule } from './layout/layout.module';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientComponent } from './containers/client/client.component';
import { ClientService } from './services/client.service';
import { ClientEffects } from './store/effects/client.effects';


@NgModule({
  declarations: [UserComponent, UserListComponent, AdminComponent, ClientListComponent, ClientComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('admin', adminReducers),
    EffectsModule.forFeature([ManagerEffects, ClientEffects]),
    MaterialModule,
    LayoutModule
  ],
  providers: [ManagerService, ClientService]
})
export class AdminModule { }