import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { managerRmReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ClientsEffects } from './clients/effects/clients.effects';
import { ClientsService } from '../../manager-rm/clients/shared/services/clients.service';
import { ClientsFacade } from './clients/facades/clients.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('manager-rm', managerRmReducers),
    EffectsModule.forFeature([ClientsEffects]),   
  ],
  providers: [
    ClientsService,
    ClientsFacade
  ]
})
export class ManagerRmStoreModule { }
