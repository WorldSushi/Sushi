import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReachOutcomesComponent } from './components/reach-outcomes/reach-outcomes.component';
import { DialogBodyComponent } from './Dialog/dialog-body/dialog-body.component';

@NgModule({
  declarations: [
    ReachOutcomesComponent,
    DialogBodyComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  entryComponents: [
    DialogBodyComponent 
  ],
})
export class ReachOutcomesModule { }
