import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CallsResultDialogComponent } from '../calls-result-dialog/calls-result-dialog.component';

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

  openCallsResult(){
    let dialogRef = this.dialog.open(CallsResultDialogComponent, {
      width: '938px',
      data: {
        title: this.data.clientTitle,
        MSresults: {
          calls: this.data.MSCallsDates.filter(item => item.contactType == 10).length,
          whatsUp: this.data.MSCallsDates.filter(item => item.contactType == 20).length,
          letters: this.data.MSCallsDates.filter(item => item.contactType == 30).length,
          sum: this.data.MSCallsDates.filter(item => item.contactType != 0).length
        },
        RMresults: {
          calls: this.data.RMCallsDates.filter(item => item.contactType == 10).length,
          whatsUp: this.data.RMCallsDates.filter(item => item.contactType == 20).length,
          letters: this.data.RMCallsDates.filter(item => item.contactType == 30).length,
          sum: this.data.RMCallsDates.filter(item => item.contactType > 0).length
        }
      }
                  
    })
  }

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CallsDatesDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

  ngOnInit() {
  }

}
