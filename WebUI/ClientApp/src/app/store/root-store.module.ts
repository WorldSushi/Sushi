import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ManagerRmStoreModule } from './manager-rm/manager-rm.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,  
    StoreModule.forRoot(appReducer),  
    EffectsModule.forRoot([]),
    ManagerRmStoreModule,
    StoreDevtoolsModule.instrument({}),
  ]
})
export class RootStoreModule { }
