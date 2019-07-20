import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { UserEffects } from './app/effects/user.effects';
import { UserFacade } from './app/facades/user.facade';
import { UserService } from '../shared/services/user.service';
import { ClientsStoreModule } from './clients/clients.module';
import { ManagersStoreModule } from './managers/managers.module';
import { WorkgroupsStoreModule } from './workgroups/workgroups.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,  
    StoreModule.forRoot(appReducer),  
    EffectsModule.forRoot([UserEffects]),
    ClientsStoreModule,
    ManagersStoreModule,
    WorkgroupsStoreModule,
    StoreDevtoolsModule.instrument({}),
  ],
  providers: [
    UserFacade,
    UserService
  ]
})
export class RootStoreModule { }
