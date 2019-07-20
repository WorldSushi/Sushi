import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { WorkgroupsComponent } from './containers/workgroups/workgroups.component';
import { WorkgroupsListComponent } from './components/workgroups-list/workgroups-list.component';

@NgModule({
  declarations: [
    WorkgroupsComponent, 
    WorkgroupsListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    WorkgroupsComponent,
    WorkgroupsListComponent
  ]
})
export class WorkgroupsModule { }
