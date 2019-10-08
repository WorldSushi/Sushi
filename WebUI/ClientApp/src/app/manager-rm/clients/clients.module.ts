import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './containers/clients/clients.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CreateClientDialogComponent } from './dialogs/create-client-dialog/create-client-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditClientDialogComponent } from './dialogs/edit-client-dialog/edit-client-dialog.component';
import { AnalysisDialogComponent } from './dialogs/analysis-dialog/analysis-dialog.component';
import { WeekPlansDialogComponent } from './dialogs/week-plans/week-plans-dialog.component';
import { CallsResultDialogComponent } from './dialogs/calls-result-dialog/calls-result-dialog.component';
import { ClientTypeTranslatePipe } from 'src/app/store/shared/pipes/client-type-translate-pipe';
import { NumberOfCallsTranslatePipe } from 'src/app/store/shared/pipes/number-of-calls-pipe';
import { NumberOfShipmentsTranslatePipe } from 'src/app/store/shared/pipes/number-of-shipments-pipe';
import { CallsDatesDialogComponent } from './dialogs/calls-dates-dialog/calls-dates-dialog.component';
import { DateExtensionsService } from 'src/app/shared/services/date-extensions.service';
import { ClientGroupTranslatePipe } from 'src/app/store/shared/pipes/client-group-translate.pipe';
import { ClientPhonesComponent } from './dialogs/client-phones/client-phones.component';
import { CorrectionResponseComponent } from './dialogs/correction-response/correction-response.component';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientListComponent,
    CreateClientDialogComponent,
    EditClientDialogComponent,
    AnalysisDialogComponent,
    WeekPlansDialogComponent,
    CallsResultDialogComponent,
    ClientTypeTranslatePipe,
    NumberOfCallsTranslatePipe,
    NumberOfShipmentsTranslatePipe,
    ClientGroupTranslatePipe,
    CallsDatesDialogComponent,
    ClientPhonesComponent,
    CorrectionResponseComponent
  ],
  entryComponents: [
    CreateClientDialogComponent,
    EditClientDialogComponent,
    AnalysisDialogComponent,
    WeekPlansDialogComponent,
    CallsResultDialogComponent,
    CallsDatesDialogComponent,
    ClientPhonesComponent,
    CorrectionResponseComponent
  ],
  exports: [
    ClientsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DateExtensionsService
  ]
})
export class ClientsModule { }
