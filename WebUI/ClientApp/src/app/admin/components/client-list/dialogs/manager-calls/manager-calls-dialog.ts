import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialog } from '@angular/material';
import { Inject, Component } from '@angular/core';

@Component({
    selector: 'app-manager-calls-dialog',
    templateUrl: 'manager-calls-dialog.html',
  })
  export class ManagerCallsDialog {
  
    public dataSource = new MatTableDataSource(this.data.manager.calls);

    public displayedColumns = [
      "date",
      "duration",
      "record"
    ]

    save(): void {
      this.dialogRef.close();
    }
  
    closeDialog(): void {
      this.dialogRef.close();
    }
  
    constructor(private dialogRef: MatDialogRef<ManagerCallsDialog>,
      private dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data) {}
  }