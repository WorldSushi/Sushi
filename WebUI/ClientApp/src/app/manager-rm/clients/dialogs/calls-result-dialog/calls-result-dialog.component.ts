import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-calls-result-dialog',
  templateUrl: './calls-result-dialog.component.html',
  styleUrls: ['./calls-result-dialog.component.sass']
})
export class CallsResultDialogComponent implements OnInit {

  displayedColumns: string[] = ['MScalls', 'MSwhatsUp', 'MSletters', 'MSsum', 'RMcalls', 'RMwhatsUp', 'RMletters', 'RMsum']

  constructor(public dialogRef: MatDialogRef<CallsResultDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

  ngOnInit() {
  }

}
