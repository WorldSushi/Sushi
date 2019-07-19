import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './containers/clients/clients.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ClientTypeTranslatePipe } from 'src/app/store/shared/pipes/client-type-translate-pipe';
import { NumberOfCallsTranslatePipe } from 'src/app/store/shared/pipes/number-of-calls-pipe';
import { NumberOfShipmentsTranslatePipe } from 'src/app/store/shared/pipes/number-of-shipments-pipe';

@NgModule({
  declarations: [
    ClientsComponent, 
    ClientListComponent,
    ClientTypeTranslatePipe,
    NumberOfCallsTranslatePipe,
    NumberOfShipmentsTranslatePipe,
  ],
  imports: [
    CommonModule,
    MaterialModule, 
  ],
  exports: [
    ClientsComponent,
    ClientListComponent
  ]
})
export class ClientsModule { }
