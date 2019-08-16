import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDividerModule, MatSortModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { getRusPaginatorIntl } from '../mat-paginator-intl';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatTabsModule,
    MatExpansionModule,
    MatDividerModule,
    MatTableModule,
    MatListModule,
    MatStepperModule,
    MatDialogModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatTabsModule,
    MatExpansionModule,
    MatDividerModule,
    MatTableModule,
    MatListModule,
    MatStepperModule,
    MatDialogModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSortModule 
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getRusPaginatorIntl() }
  ]
})
export class MaterialModule { }
