import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagersComponent } from './containers/managers/managers.component';
import { ManagersListComponent } from './components/managers-list/managers-list.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    ManagersComponent, 
    ManagersListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ManagersComponent,
    ManagersListComponent
  ]
})
export class ManagersModule { }
