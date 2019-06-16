import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './containers/clients/clients.component';

@NgModule({
  declarations: [
    ClientsComponent
  ],
  exports: [
    ClientsComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ClientsModule { }
