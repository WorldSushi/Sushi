import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { managersModuleReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ManagersEffects } from './effects/manager.effects';
import { ManagerService } from 'src/app/admin/managers/shared/services/manager.service';
import { ManagersFacade } from './facades/manager.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('managers', managersModuleReducers),
    EffectsModule.forFeature([
      ManagersEffects
    ])
  ],
  providers: [
    ManagerService,
    ManagersFacade
  ]
})
export class ManagersStoreModule { }
