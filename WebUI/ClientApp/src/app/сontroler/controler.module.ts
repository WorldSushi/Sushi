import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlerComponent } from './controler.component';
import { ControlerRoutingModule } from './controler-routing.module';
import { AcceptManagerModule } from './Calls/acceptManager.module';
import { ReportModule } from './report/report.module';
import { ClientsModule } from '../сontroler/clients-accept/client-accept.module';
import { PlanTaskModule } from './plan-task/plan-task.module';

@NgModule({
  declarations: [
    ControlerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ControlerRoutingModule,
    AcceptManagerModule,
    ReactiveFormsModule,
    ReportModule,
    ClientsModule,
    PlanTaskModule
  ]
})
export class ControlerModule { }
