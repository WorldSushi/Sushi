import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanTaskComponent } from './plan-task/plan-task.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IgxCalendarModule, IgxDatePickerModule } from 'igniteui-angular';
import { DateExtensionsService } from '../../shared/services/date-extensions.service';

@NgModule({
  declarations: [PlanTaskComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    IgxCalendarModule,
    IgxDatePickerModule
  ],
  providers: [
    DateExtensionsService
  ]
})
export class PlanTaskModule { }
