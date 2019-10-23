  import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IgxCalendarModule, IgxDatePickerModule } from 'igniteui-angular';
import { DateExtensionsService } from '../../shared/services/date-extensions.service';
import { ClientAcceptComponent } from './client-accept/client-accept.component';
import { ClientTypeTranslatePipe } from '../../store/shared/pipes/client-type-translate-pipe';

@NgModule({
  declarations:
    [
      ClientAcceptComponent,
    ],
  exports: [
  ],
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
export class ClientsModule { }
