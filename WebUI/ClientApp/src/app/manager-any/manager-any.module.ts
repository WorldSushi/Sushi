import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerAnyComponent } from './manager-any.component';
import { MaterialModule } from '../material/material.module';
import { ManagerAnyRoutingModule } from './manager-any-routing.module';
import { ClientsModule } from './clients/clients.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ManagerAnyComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ManagerAnyRoutingModule,
    ClientsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ManagerAnyModule { }
