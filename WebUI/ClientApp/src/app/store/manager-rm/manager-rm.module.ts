import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { managerRmReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ClientsService } from 'src/app/manager-rm/clients/shared/services/clients.service';
import { ClientsFacade } from './clients/facades/clients.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('manager-rm', managerRmReducers),
    EffectsModule.forFeature([]),   
  ],
  providers: [
    ClientsService,
    ClientsFacade
  ]
})
export class ManagerRmModule { }
