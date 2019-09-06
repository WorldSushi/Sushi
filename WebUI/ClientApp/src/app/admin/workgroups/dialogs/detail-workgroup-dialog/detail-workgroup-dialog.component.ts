import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';
import { EditManagerDialogComponent } from 'src/app/admin/managers/dialogs/edit-manager-dialog/edit-manager-dialog.component';
import { EditWorkgroupDialogComponent } from '../edit-workgroup-dialog/edit-workgroup-dialog.component';

@Component({
  selector: 'app-detail-workgroup-dialog',
  templateUrl: './detail-workgroup-dialog.component.html',
  styleUrls: ['./detail-workgroup-dialog.component.sass']
})
export class DetailWorkgroupDialogComponent implements OnInit {

  newClientId: number = 0;

  @Output() clientAdded = new EventEmitter();

  @Output() workgroupChanged = new EventEmitter();

  close(){
    this.dialogRef.close();
  }

  openWorkgroupEdit() {
    console.log(this.data.freeManagers);  
    const dialogRef = this.dialog.open(EditWorkgroupDialogComponent, {
      width: '725px',
      data: {
        workgroup: this.data.workgroup,
        managers: this.data.freeManagers
      }
    })

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log(res);
        this.workgroupChanged.emit(res);      
      }

      this.dialogRef.close(res);
    })
  }


  addNewClient(){
    if(this.newClientId > 0){
      this.clientAdded.emit({ clientId: this.newClientId, workgroupId: this.data.workgroup.id });
      this.newClientId = 0;
    }

    this.dialogRef.close();
    
  }

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DetailWorkgroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

  ngOnInit() {

  }

}
