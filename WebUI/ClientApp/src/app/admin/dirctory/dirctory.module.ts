import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryComponent } from './component/directory/directory.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { MatCardModule } from '@angular/material';

@NgModule({
    declarations: [
        DirectoryComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule
  ],
    exports: [
        DirectoryComponent
    ],
    entryComponents: [

    ],
})
export class DirctoryModule { }
