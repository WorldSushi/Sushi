import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientTypeTranslatePipe } from 'src/app/store/shared/pipes/client-type-translate-pipe';
import { NumberOfCallsTranslatePipe } from 'src/app/store/shared/pipes/number-of-calls-pipe';
import { NumberOfShipmentsTranslatePipe } from 'src/app/store/shared/pipes/number-of-shipments-pipe';
import { DateExtensionsService } from 'src/app/shared/services/date-extensions.service';
import { ClientGroupTranslatePipe } from 'src/app/store/shared/pipes/client-group-translate.pipe';
import { AcceptManagerComponent } from './components/acceptManager/acceptManager.component';
import { AcceptComponent } from './containers/accept/accept.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxCalendarModule, IgxDatePickerModule } from 'igniteui-angular';

@NgModule({
  declarations: [
    AcceptComponent,
    AcceptManagerComponent,
    ClientTypeTranslatePipe,
    NumberOfCallsTranslatePipe,
    NumberOfShipmentsTranslatePipe,
    ClientGroupTranslatePipe
  ],
  entryComponents: [
  ],
  exports: [
    AcceptComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FormsModule,
    HttpClientModule,
    IgxCalendarModule,
    IgxDatePickerModule
  ]
})
export class AcceptManagerModule { }
