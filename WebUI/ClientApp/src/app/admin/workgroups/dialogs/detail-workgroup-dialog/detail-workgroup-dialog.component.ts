import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';

@Component({
  selector: 'app-detail-workgroup-dialog',
  templateUrl: './detail-workgroup-dialog.component.html',
  styleUrls: ['./detail-workgroup-dialog.component.sass']
})
export class DetailWorkgroupDialogComponent implements OnInit {

  newClientId: number = 0;

  @Output() clientAdded = new EventEmitter();

  close(){
    this.dialogRef.close();
  }

  /*openWorkgroupEdit() {
    const dialogRef = this.dialog.open(EditManagerDialogComponent, {
      width: '725px',
      data: this.data
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.dialogRef.close(res);
      }
    })
  }*/


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
      console.log(this.data);
    }

  ngOnInit() {

  }

}
