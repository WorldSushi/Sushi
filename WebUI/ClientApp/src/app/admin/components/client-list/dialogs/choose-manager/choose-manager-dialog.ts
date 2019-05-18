import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialog } from '@angular/material';
import { Inject, Component } from '@angular/core';

@Component({
    selector: 'app-choose-manager-dialog',
    templateUrl: 'choose-manager-dialog.html',
  })
  export class ChooseManagerDialog {

    public selectedManagerId: number;

    closeDialog(): void {
      this.dialogRef.close();
    }
  
    save(): void {
      this.dialogRef.close({
        id: this.selectedManagerId,
        login: this.data.managers.find(item => item.id == this.selectedManagerId).login
      });
    }

  
    constructor(private dialogRef: MatDialogRef<ChooseManagerDialog>,
      private dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data) {}
  }