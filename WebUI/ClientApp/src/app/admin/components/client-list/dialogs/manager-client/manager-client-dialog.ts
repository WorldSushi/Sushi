import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialog } from '@angular/material';
import { Inject, Component } from '@angular/core';
import { ManagerCallsDialog } from '../manager-calls/manager-calls-dialog';
import * as moment from 'moment';

@Component({
    selector: 'app-manager-client-dialog',
    templateUrl: 'manager-client-dialog.html',
  })
  export class ManagerClientDialog {
  
    public dataSource = new MatTableDataSource(this.data.managers);

    public displayedColumns = [
      "login",
      "amountCalls",
      "plannedAmountCalls"
    ]

    save(): void {
      this.dialogRef.close();
    }
  
    closeDialog(): void {
      this.dialogRef.close();
    }

    openManagerCalls(id: number): void {
      const dialogRef = this.dialog.open(ManagerCallsDialog, {
        minWidth: '620px',
        data: {
          manager: {
            login: this.data.managers.find(item => item.id == id).login,
            calls: this.data.managers.find(item => item.id == id)
              .calls
              .map(item => {

                return {
                  date: moment(new Date(item.start_time * 1000)).format("DD.MM.YYYY HH:MM"),
                  duration: (Math.floor(item.duration / 60)).toString() + ":" + (item.duration % 60),
                  record: item.recording
                }

              })
          }
        }
      })
    }
  
    constructor(private dialogRef: MatDialogRef<ManagerClientDialog>,
      private dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) private data) {}
  }