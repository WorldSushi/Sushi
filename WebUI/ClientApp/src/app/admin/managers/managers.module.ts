import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagersComponent } from './containers/managers/managers.component';
import { ManagersListComponent } from './components/managers-list/managers-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CreateManagerDialogComponent } from './dialogs/create-manager-dialog/create-manager-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ManagersComponent, 
    ManagersListComponent, 
    CreateManagerDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ManagersComponent,
    ManagersListComponent
  ],
  entryComponents: [
    CreateManagerDialogComponent
  ]
})
export class ManagersModule { }
