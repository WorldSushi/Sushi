import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-workgroup-dialog',
  templateUrl: './create-workgroup-dialog.component.html',
  styleUrls: ['./create-workgroup-dialog.component.sass']
})
export class CreateWorkgroupDialogComponent implements OnInit {

  newWorkgroup = {
    escortManagerId: 0,
    regionalManagerId: 0,
    title: ''
  }

  save(){
    if(this.newWorkgroup.escortManagerId == 0 || this.newWorkgroup.regionalManagerId == 0 || this.newWorkgroup.escortManagerId == this.newWorkgroup.regionalManagerId || this.newWorkgroup.title == '')
      return
    
    this.dialogRef.close(this.newWorkgroup);
  }

  close(){
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<CreateWorkgroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
