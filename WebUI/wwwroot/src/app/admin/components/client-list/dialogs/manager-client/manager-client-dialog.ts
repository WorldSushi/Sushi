import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { Inject, Component } from '@angular/core';

@Component({
    selector: 'app-manager-client-dialog',
    templateUrl: 'manager-client-dialog.html',
  })
  export class ManagerClientDialog {
  
    private dataSource = new MatTableDataSource(this.data.managers);

    private displayedColumns = [
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
  
    constructor(public dialogRef: MatDialogRef<ManagerClientDialog>,
      @Inject(MAT_DIALOG_DATA) public data) {}
  }