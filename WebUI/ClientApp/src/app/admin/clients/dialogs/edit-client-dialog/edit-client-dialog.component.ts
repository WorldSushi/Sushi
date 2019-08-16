import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';
import { ClientPhonesComponent } from '../client-phones/client-phones.component';

@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.component.html',
  styleUrls: ['./edit-client-dialog.component.sass']
})
export class EditClientDialogComponent implements OnInit {

  save(){
    this.dialogRef.close(this.data)
  }

  close(){
    this.dialogRef.close();
  }

  openClientPhones(){
    const dialogRef = this.dialog.open(ClientPhonesComponent, {
      width: '720px',
      data: {
        phones: this.data.phones,
        clientId: this.data.id
      }
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.data.phones = res.phones;
      }
    })
  }

  constructor(
      public dialog: MatDialog,
      public dialogRef: MatDialogRef<EditClientDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: IClient
    ) { }

  ngOnInit() {
    if(this.data.phones.length == 0){
      this.data.phones = [{
        id: 0,
        phone: '',
        clientId: this.data.id
      }]
    }
  }

}
