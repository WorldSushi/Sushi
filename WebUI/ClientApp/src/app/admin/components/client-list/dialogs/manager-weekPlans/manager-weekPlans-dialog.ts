import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialog } from '@angular/material';
import { Inject, Component } from '@angular/core';
import { WeekPlanDialog } from '../weekplan/weekplan.dialog';

@Component({
    selector: 'app-manager-weekPlans-dialog',
    templateUrl: 'manager-weekPlans-dialog.html',
  })
  export class ManagerWeekPlansDialog {
  
    public dataSource = new MatTableDataSource(this.data.managers);

    public displayedColumns = [
      "login",
    ]

    save(): void {
      this.dialogRef.close();
    }
  
    closeDialog(): void {
      this.dialogRef.close();
    }

    weekPlanDetail(weeks){
        console.log(weeks);
        const dialogRef = this.dialog.open(WeekPlanDialog, {
          minWidth: '620px',
          data: {
            weekPlans: weeks     
          }
        })
      }

    
    constructor(private dialogRef: MatDialogRef<ManagerWeekPlansDialog>,
      private dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) private data) {}
  }