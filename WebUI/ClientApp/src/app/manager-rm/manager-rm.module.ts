import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRMComponent } from './manager-rm.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ManagerRMComponent,
    MaterialModule
  ],
  imports: [
    CommonModule
  ]
})
export class ManagerRmModule { }
