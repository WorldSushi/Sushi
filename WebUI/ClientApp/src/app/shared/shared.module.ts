import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTypeTranslatePipe } from './pipes/client-type-translate-pipe';
import { NumberOfCallsTranslatePipe } from './pipes/number-of-calls-pipe';
import { BusinessTripPlanCompleteTypeTranslatePipe } from './pipes/business-trip-completed-type.pipe';
import { NumberOfShipmentsTranslatePipe } from './pipes/number-of-shipments-pipe';

@NgModule({
  declarations: [
    ClientTypeTranslatePipe,
    NumberOfCallsTranslatePipe,
    BusinessTripPlanCompleteTypeTranslatePipe,
    NumberOfCallsTranslatePipe,
    NumberOfShipmentsTranslatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClientTypeTranslatePipe,
    NumberOfCallsTranslatePipe,
    BusinessTripPlanCompleteTypeTranslatePipe,
    NumberOfCallsTranslatePipe,
    NumberOfShipmentsTranslatePipe
  ]
})
export class SharedModule { }
