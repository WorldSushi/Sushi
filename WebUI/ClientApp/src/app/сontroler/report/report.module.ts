import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IgxCalendarModule, IgxDatePickerModule } from 'igniteui-angular';
import { HttpClientModule } from '@angular/common/http';
import { ReportCallComponent } from './component/report-call/report-call.component';

@NgModule({
  declarations: [
    ReportCallComponent,
  ],
  exports: [
    ReportCallComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    IgxCalendarModule,
    IgxDatePickerModule
  ]
})
export class ReportModule { }
