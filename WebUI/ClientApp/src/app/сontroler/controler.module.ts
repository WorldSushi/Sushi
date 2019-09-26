import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ControlerComponent } from './controler.component';
import { ControlerRoutingModule } from './controler-routing.module';
import { AcceptManagerModule } from './clients/acceptManager.module';

@NgModule({
  declarations: [
    ControlerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ControlerRoutingModule,
    AcceptManagerModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ControlerModule { }
