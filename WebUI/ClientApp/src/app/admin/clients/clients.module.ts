import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './containers/clients/clients.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ClientTypeTranslatePipe } from 'src/app/store/shared/pipes/client-type-translate-pipe';
import { NumberOfCallsTranslatePipe } from 'src/app/store/shared/pipes/number-of-calls-pipe';
import { NumberOfShipmentsTranslatePipe } from 'src/app/store/shared/pipes/number-of-shipments-pipe';
import { CreateClientDialogComponent } from './dialogs/create-client-dialog/create-client-dialog.component';
import { EditClientDialogComponent } from './dialogs/edit-client-dialog/edit-client-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientGroupTranslatePipe } from 'src/app/store/shared/pipes/client-group-translate.pipe';

@NgModule({
  declarations: [
    ClientsComponent, 
    ClientListComponent,
    ClientTypeTranslatePipe,
    NumberOfCallsTranslatePipe,
    NumberOfShipmentsTranslatePipe,
    CreateClientDialogComponent,
    EditClientDialogComponent,
    ClientGroupTranslatePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ClientsComponent,
    ClientListComponent
  ],
  entryComponents: [
    CreateClientDialogComponent,
    EditClientDialogComponent
  ]
})
export class ClientsModule { }
