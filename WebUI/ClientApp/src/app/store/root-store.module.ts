import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ManagerRmStoreModule } from './manager-rm/manager-rm.module';
import { UserEffects } from './app/effects/user.effects';
import { UserFacade } from './app/facades/user.facade';
import { UserService } from '../shared/services/user.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,  
    StoreModule.forRoot(appReducer),  
    EffectsModule.forRoot([UserEffects]),
    ManagerRmStoreModule,
    StoreDevtoolsModule.instrument({}),
  ],
  providers: [
    UserFacade,
    UserService
  ]
})
export class RootStoreModule { }
