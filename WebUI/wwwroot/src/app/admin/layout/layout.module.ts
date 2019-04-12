import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToplineComponent } from './topline/topline.component';

@NgModule({
  declarations: [SidebarComponent, ToplineComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    ToplineComponent
  ]
})
export class LayoutModule { }
