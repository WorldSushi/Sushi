import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IgxCalendarModule, IgxDatePickerModule } from 'igniteui-angular';
import { HttpClientModule } from '@angular/common/http';
import { ReportCallComponent } from './component/report-call/report-call.component';
import { MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
  declarations: [
    ReportCallComponent,
  ],
  exports: [
      ReportCallComponent,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    IgxCalendarModule,
    IgxDatePickerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class ReportModule { }
