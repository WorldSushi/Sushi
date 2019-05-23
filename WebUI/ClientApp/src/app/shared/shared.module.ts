import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTypeTranslatePipe } from './pipes/client-type-translate-pipe';
import { NumberOfCallsTranslatePipe } from './pipes/number-of-calls-pipe';
import { BusinessTripPlanCompleteTypeTranslatePipe } from './pipes/business-trip-completed-type.pipe';

@NgModule({
  declarations: [
    ClientTypeTranslatePipe,
    NumberOfCallsTranslatePipe,
    BusinessTripPlanCompleteTypeTranslatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClientTypeTranslatePipe,
    NumberOfCallsTranslatePipe,
    BusinessTripPlanCompleteTypeTranslatePipe
  ]
})
export class SharedModule { }
