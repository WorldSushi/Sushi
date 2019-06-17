import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-analysis-dialog',
  templateUrl: './analysis-dialog.component.html',
  styleUrls: ['./analysis-dialog.component.sass']
})
export class AnalysisDialogComponent implements OnInit {
  displayedColumns: string[] = ['reportPrevMonth', 'reportAvg5Months', 'prevMonth', 'avg5Months']

  constructor(public dialogRef: MatDialogRef<AnalysisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
