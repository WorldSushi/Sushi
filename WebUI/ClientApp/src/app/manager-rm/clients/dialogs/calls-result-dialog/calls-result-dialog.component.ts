import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CallsDatesDialogComponent } from '../calls-dates-dialog/calls-dates-dialog.component';

@Component({
  selector: 'app-calls-result-dialog',
  templateUrl: './calls-result-dialog.component.html',
  styleUrls: ['./calls-result-dialog.component.sass']
})
export class CallsResultDialogComponent implements OnInit {

  displayedColumns: string[] = ['MScalls', 'MSwhatsUp', 'MSletters', 'MSsum', 'RMcalls', 'RMwhatsUp', 'RMletters', 'RMsum']

  close(){
    this.dialogRef.close();
  }


  constructor(
    public dialogRef: MatDialogRef<CallsResultDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

  ngOnInit() {
  }

}
