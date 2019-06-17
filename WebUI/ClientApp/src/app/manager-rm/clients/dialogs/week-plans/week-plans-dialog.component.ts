import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-week-plans',
  templateUrl: './week-plans-dialog.component.html',
  styleUrls: ['./week-plans-dialog.component.sass']
})
export class WeekPlansDialogComponent implements OnInit {

  displayedColumns: string[] = ['Number',  'RMplanned', 'RMfact'];

  save(){
    this.dialogRef.close(this.data);
  }

  close(){
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<WeekPlansDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
