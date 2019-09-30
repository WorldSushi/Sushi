import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRMComponent } from './manager-rm.component';
import { MaterialModule } from '../material/material.module';
import { ManagerRmRoutingModule } from './manager-rm-routing.module';
import { ClientsModule } from './clients/clients.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from './dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { ReachOutcomesModule } from './reach-outcomes/reach-outcomes.module';

@NgModule({
  declarations: [
    ManagerRMComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ManagerRmRoutingModule,
    ClientsModule,
    ReactiveFormsModule,
    DashboardModule,
    RouterModule,
    ReachOutcomesModule
  ]
})
export class ManagerRmModule { }
