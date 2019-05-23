import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialog } from '@angular/material';
import { Inject, Component } from '@angular/core';
import { ManagerCallsDialog } from '../manager-calls/manager-calls-dialog';
import * as moment from 'moment';

@Component({
    selector: 'app-manager-trips-dialog',
    templateUrl: 'manager-trips-dialog.html',
  })
  export class ManagerTripsDialog {
  
    public dataSource = new MatTableDataSource(this.data.managers);

    public displayedColumns = [
      "login",
      "businessTripCompletedType",
      "plannedAmountBusinessTrips"
    ]

    save(): void {
      this.dialogRef.close();
    }
  
    closeDialog(): void {
      this.dialogRef.close();
    }

    
    constructor(private dialogRef: MatDialogRef<ManagerTripsDialog>,
      private dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) private data) {}
  }