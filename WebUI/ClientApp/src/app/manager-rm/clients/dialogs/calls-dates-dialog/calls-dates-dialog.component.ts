import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CallsResultDialogComponent } from '../calls-result-dialog/calls-result-dialog.component';
import { IClient } from '../../shared/models/client.model';

@Component({
  selector: 'app-calls-dates-dialog',
  templateUrl: './calls-dates-dialog.component.html',
  styleUrls: ['./calls-dates-dialog.component.sass']
})
export class CallsDatesDialogComponent implements OnInit {

  displayedColumns: string[] = ['day', 'MSvalue', 'RMvalue'];

  getDate(numberOfDay: number){
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    return new Date(currentYear, currentMonth, numberOfDay).toLocaleDateString();
  }

  save(){
    this.dialogRef.close(this.data);
  }

  close(){
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<CallsDatesDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

  ngOnInit() {
  }

}
