import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagersComponent } from './containers/managers/managers.component';
import { ManagersListComponent } from './components/managers-list/managers-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CreateManagerDialogComponent } from './dialogs/create-manager-dialog/create-manager-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailManagerDialogComponent } from './dialogs/detail-manager-dialog/detail-manager-dialog.component';
import { EditManagerDialogComponent } from './dialogs/edit-manager-dialog/edit-manager-dialog.component';

@NgModule({
  declarations: [
    ManagersComponent, 
    ManagersListComponent, 
    CreateManagerDialogComponent, 
    DetailManagerDialogComponent, EditManagerDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ManagersComponent,
    ManagersListComponent,
  ],
  entryComponents: [
    CreateManagerDialogComponent,
    DetailManagerDialogComponent,
    EditManagerDialogComponent
  ]
})
export class ManagersModule { }
