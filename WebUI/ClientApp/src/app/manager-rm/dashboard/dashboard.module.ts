import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { DashboardPanelComponent } from './components/dashboard-panel/dashboard-panel.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    DashboardComponent, 
    DashboardPanelComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    DashboardComponent,
    DashboardPanelComponent
  ]
})
export class DashboardModule { }
