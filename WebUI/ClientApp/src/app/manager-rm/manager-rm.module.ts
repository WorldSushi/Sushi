import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRMComponent } from './manager-rm.component';
import { MaterialModule } from '../material/material.module';
import { ManagerRmRoutingModule } from './manager-rm-routing.module';
import { ClientsModule } from './clients/clients.module';

@NgModule({
  declarations: [
    ManagerRMComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ManagerRmRoutingModule,
    ClientsModule
  ]
})
export class ManagerRmModule { }
