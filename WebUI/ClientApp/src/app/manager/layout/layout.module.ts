import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToplineComponent } from './components/topline/topline.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarComponent, ToplineComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    ToplineComponent
  ]
})
export class LayoutModule { }
