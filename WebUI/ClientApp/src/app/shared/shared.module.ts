import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTypeTranslatePipe } from './pipes/client-type-translate-pipe';
import { NumberOfCallsTranslatePipe } from './pipes/number-of-calls-pipe';
import { NumberOfShipmentsTranslatePipe } from './pipes/number-of-shipments-pipe';

@NgModule({
  declarations: [
    ClientTypeTranslatePipe,
    NumberOfCallsTranslatePipe,
    NumberOfShipmentsTranslatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClientTypeTranslatePipe,
    NumberOfCallsTranslatePipe,
    NumberOfShipmentsTranslatePipe
  ]
})
export class SharedModule { }
