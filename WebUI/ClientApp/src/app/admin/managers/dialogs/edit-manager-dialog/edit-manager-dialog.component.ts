import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-manager-dialog',
  templateUrl: './edit-manager-dialog.component.html',
  styleUrls: ['./edit-manager-dialog.component.sass']
})
export class EditManagerDialogComponent implements OnInit {

  save(){
    this.dialogRef.close(this.data);
  }

  close(){
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<EditManagerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  ngOnInit() {
  }

}
