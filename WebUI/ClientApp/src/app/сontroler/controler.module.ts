import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ControlerComponent } from './controler.component';
import { ControlerRoutingModule } from './controler-routing.module';
import { AcceptManagerModule } from './Calls/acceptManager.module';
import { ReportCallComponent } from './report/component/report-call/report-call.component';
import { ReportModule } from './report/report.module';

@NgModule({
  declarations: [
    ControlerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ControlerRoutingModule,
    AcceptManagerModule,
    ReactiveFormsModule,
    ReportModule
  ]
})
export class ControlerModule { }
