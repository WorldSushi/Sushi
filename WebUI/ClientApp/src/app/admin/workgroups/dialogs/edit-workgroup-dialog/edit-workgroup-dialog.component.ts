import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateWorkgroupDialogComponent } from '../create-workgroup-dialog/create-workgroup-dialog.component';

@Component({
  selector: 'app-edit-workgroup-dialog',
  templateUrl: './edit-workgroup-dialog.component.html',
  styleUrls: ['./edit-workgroup-dialog.component.sass']
})
export class EditWorkgroupDialogComponent implements OnInit {


  save(){
    this.data.workgroup.escortManagerId == parseInt(this.data.workgroup.escortManagerId)
    this.data.workgroup.regionalManagerId == parseInt(this.data.workgroup.regionalManagerId)

    if(this.data.workgroup.escortManagerId == 0 || this.data.workgroup.regionalManagerId == 0 || this.data.workgroup.title == '')
      return

    this.dialogRef.close(this.data);
  }

  close(){
    this.dialogRef.close();
  }

  getManagers() {
    //console.log(this.data.freeManagers);
    console.log([...this.data.managers]);
    return [...this.data.managers];
  }

  constructor(public dialogRef: MatDialogRef<EditWorkgroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
    }

  ngOnInit() {
  }

}
