import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanTaskComponent } from './plan-task/plan-task.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IgxCalendarModule, IgxDatePickerModule } from 'igniteui-angular';
import { DateExtensionsService } from '../../shared/services/date-extensions.service';
import { AcceptManagerDialogComponent } from './dialog/accept-manager-dialog/accept-manager-dialog.component';

@NgModule({
  declarations: [PlanTaskComponent, AcceptManagerDialogComponent],
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
  ],
  entryComponents: [
    AcceptManagerDialogComponent
  ],
})
export class PlanTaskModule { }
