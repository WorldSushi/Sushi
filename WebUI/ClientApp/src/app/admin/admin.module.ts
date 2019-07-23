import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material/material.module';
import { ClientsModule } from './clients/clients.module';
import { ManagersModule } from './managers/managers.module';
import { WorkgroupsModule } from './workgroups/workgroups.module';
import { AdminGuard } from '../shared/guards/admin.guard';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ClientsModule,
    ManagersModule,
    WorkgroupsModule
  ],
  providers: [AdminGuard]
})
export class AdminModule { }
