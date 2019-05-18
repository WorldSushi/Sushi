import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './containers/user/user.component';
import { UserListComponent, ManagerCreateDialog } from './components/user-list/user-list.component';
import { adminReducers } from './store/reducers';
import { ManagerService } from './services/manager.service';
import { EffectsModule } from '@ngrx/effects';
import { ManagerEffects } from './store/effects/manager.effects';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { AdminComponent } from './admin.component';
import { LayoutModule } from './layout/layout.module';
import { ClientListComponent, ClientCreateDialog, ClientManagersDialog, ClientDetailDialog } from './components/client-list/client-list.component';
import { ClientComponent } from './containers/client/client.component';
import { ClientService } from './services/client.service';
import { ClientEffects } from './store/effects/client.effects';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ManagerClientDialog } from './components/client-list/dialogs/manager-client/manager-client-dialog';
import { ManagerCallsDialog } from './components/client-list/dialogs/manager-calls/manager-calls-dialog';
import { ChooseManagerDialog } from './components/client-list/dialogs/choose-manager/choose-manager-dialog';
import { ManagerClientService } from './services/manager-client.service';
import { ClientTypeTranslatePipe } from './pipes/client-type-translate-pipe';


@NgModule({
  declarations: [UserComponent, 
    UserListComponent, 
    AdminComponent,
    ClientListComponent, 
    ClientComponent,
    ClientCreateDialog,
    ClientManagersDialog,
    ManagerCreateDialog,
    ClientDetailDialog,
    ManagerClientDialog,
    ManagerCallsDialog,
    ChooseManagerDialog,
    ClientTypeTranslatePipe
  ],
  entryComponents: [
    ClientCreateDialog,
    ClientManagersDialog,
    ManagerCreateDialog,
    ClientDetailDialog,
    ManagerClientDialog,
    ManagerCallsDialog,
    ChooseManagerDialog
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('admin', adminReducers),
    EffectsModule.forFeature([ManagerEffects, ClientEffects]),
    MaterialModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ManagerService, 
    ClientService, 
    ManagerClientService,
  ]
})
export class AdminModule { }
