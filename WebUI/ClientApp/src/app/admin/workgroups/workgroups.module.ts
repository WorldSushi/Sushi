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
import { DetailWorkgroupDialogComponent } from './dialogs/detail-workgroup-dialog/detail-workgroup-dialog.component';
import { FormsModule } from '@angular/forms';
import { CreateWorkgroupDialogComponent } from './dialogs/create-workgroup-dialog/create-workgroup-dialog.component';
import { EditWorkgroupDialogComponent } from './dialogs/edit-workgroup-dialog/edit-workgroup-dialog.component';
import { PerformanceChartComponent } from './dialogs/performance-chart/performance-chart.component';

@NgModule({
  declarations: [
    WorkgroupsComponent, 
    WorkgroupsListComponent,
    WorkgroupsCallsComponent, 
    WorkgroupsCallsListComponent, 
    WorkgroupPlansComponent, 
    WorkgroupPlansListComponent, 
    DetailWorkgroupDialogComponent, 
    CreateWorkgroupDialogComponent, 
    EditWorkgroupDialogComponent,
    PerformanceChartComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    WorkgroupsComponent,
    WorkgroupsListComponent,
    WorkgroupsCallsComponent,
    WorkgroupsCallsListComponent,
    WorkgroupPlansComponent,
    WorkgroupPlansListComponent,
  ],
  entryComponents: [
    DetailWorkgroupDialogComponent,
    CreateWorkgroupDialogComponent,
    EditWorkgroupDialogComponent,
    PerformanceChartComponent
  ]
})
export class WorkgroupsModule { }
