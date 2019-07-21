import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { WorkgroupsComponent } from './containers/workgroups/workgroups.component';
import { WorkgroupsListComponent } from './components/workgroups-list/workgroups-list.component';
import { WorkgroupsCallsComponent } from './containers/workgroups-calls/workgroups-calls.component';
import { WorkgroupsCallsListComponent } from './components/workgroups-calls-list/workgroups-calls-list.component';
import { RouterModule } from '@angular/router';
import { WorkgroupPlansComponent } from './containers/workgroups-plans/workgroup-plans.component';
import { WorkgroupPlansListComponent } from './components/workgroups-plans-list/workgroup-plans-list.component';

@NgModule({
  declarations: [
    WorkgroupsComponent, 
    WorkgroupsListComponent,
    WorkgroupsCallsComponent, 
    WorkgroupsCallsListComponent, 
    WorkgroupPlansComponent, 
    WorkgroupPlansListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    WorkgroupsComponent,
    WorkgroupsListComponent,
    WorkgroupsCallsComponent,
    WorkgroupsCallsListComponent,
    WorkgroupPlansComponent,
    WorkgroupPlansListComponent
  ]
})
export class WorkgroupsModule { }
