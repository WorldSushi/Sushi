import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTypeTranslatePipe } from './pipes/client-type-translate-pipe';
import { NumberOfCallsTranslatePipe } from './pipes/number-of-calls-pipe';

@NgModule({
  declarations: [
    ClientTypeTranslatePipe,
    NumberOfCallsTranslatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClientTypeTranslatePipe,
    NumberOfCallsTranslatePipe
  ]
})
export class SharedModule { }
