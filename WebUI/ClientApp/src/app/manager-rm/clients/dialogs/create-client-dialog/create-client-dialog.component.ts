import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { ClientPhonesComponent } from '../client-phones/client-phones.component';

@Component({
  selector: 'app-create-client-dialog',
  templateUrl: './create-client-dialog.component.html',
  styleUrls: ['./create-client-dialog.component.sass']
})
export class CreateClientDialogComponent implements OnInit {

  createClientForm = new FormGroup({
    id: new FormControl(0),
    title: new FormControl(''),
    legalEntity: new FormControl(''),
    clientType: new FormControl(0),
    numberOfCalls: new FormControl(0),
    numberOfShipments: new FormControl(0),
    group: new FormControl(0),
  })

  phones: any[] = [];

  save(){
    this.dialogRef.close({
      ...this.createClientForm.value,
      phones: this.phones
    });
  }

  close(){
    this.dialogRef.close();
  }

  openClientPhones(){
    const dialogRef = this.dialog.open(ClientPhonesComponent, {
      width: '720px',
      data: {
        phones: this.phones,
        clientId: 0
      }
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.phones = res.phones;
      }
    })
  }

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<CreateClientDialogComponent>) { }

  ngOnInit() {
    if(this.phones.length == 0){
      this.phones.push({
        id: 0,
        phone: '',
        clientId: 0
      })
    }
  }

}
