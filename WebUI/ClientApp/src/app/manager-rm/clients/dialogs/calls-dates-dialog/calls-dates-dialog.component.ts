import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CallsResultDialogComponent } from '../calls-result-dialog/calls-result-dialog.component';
import { ICallsDate } from '../../shared/models/calls-date.model';

@Component({
  selector: 'app-calls-dates-dialog',
  templateUrl: './calls-dates-dialog.component.html',
  styleUrls: ['./calls-dates-dialog.component.sass']
})
export class CallsDatesDialogComponent implements OnInit {

  displayedColumns: string[] = ['day', 'EMcall', 'RMcall'];
  clientContacts: any[];
  currentDate: string = new Date().toLocaleDateString();

  getDate(numberOfDay: number){
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    return new Date(currentYear, currentMonth, numberOfDay).toLocaleDateString();
  }

  save(){
    this.dialogRef.close(this.clientContacts);
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
          calls: this.data.clientContacts.filter(item => item.contactType == 10 && item.managerType == 10).length,
          whatsUp: this.data.clientContacts.filter(item => item.contactType == 30 && item.managerType == 10).length,
          letters: this.data.clientContacts.filter(item => item.contactType == 20 && item.managerType == 10).length,
          sum: this.data.clientContacts.filter(item => item.contactType != 0 && item.managerType == 10).length
        },
        RMresults: {
          calls: this.data.clientContacts.filter(item => item.contactType == 10 && item.managerType == 20).length,
          whatsUp: this.data.clientContacts.filter(item => item.contactType == 30 && item.managerType == 20).length,
          letters: this.data.clientContacts.filter(item => item.contactType == 20 && item.managerType == 20).length,
          sum: this.data.clientContacts.filter(item => item.contactType > 0 && item.managerType == 20).length
        }
      }
                  
    })
}

getClientContacts(){
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  let clientContacts = [];

  const days = this.daysInMonth(currentMonth, currentYear);
  
  for(let i = 0; i < days; i++){
    clientContacts.push({
      clientId: this.data.clientId,
      date: this.getDate(i + 1).toString(),
      MScallType: 0,
      RMcallType: 0 
    })
  }

  clientContacts = clientContacts.map(item => {
    return {
      ...item,
      EMclientContactId: this.data.clientContacts.find(element => element.date == item.date && element.managerType == 10) ? this.data.clientContacts.find(element => element.date == item.date && element.managerType == 10).id : 0,
      RMclientContactId: this.data.clientContacts.find(element => element.date == item.date && element.managerType == 20) ? this.data.clientContacts.find(element => element.date == item.date && element.managerType == 20).id : 0,
      MScallType: this.data.clientContacts.find(element => element.date == item.date && element.managerType == 10) ? this.data.clientContacts.find(element => element.date == item.date && element.managerType == 10).contactType : 0,
      RMcallType: this.data.clientContacts.find(element => element.date == item.date && element.managerType == 20) ? this.data.clientContacts.find(element => element.date == item.date && element.managerType == 20).contactType : 0
    }
  })

  return clientContacts;
}

daysInMonth (month, year) {
    return new Date(year, month + 1, 0).getDate();
}

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CallsDatesDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

  ngOnInit() {
    this.clientContacts = this.getClientContacts();
  }

}
