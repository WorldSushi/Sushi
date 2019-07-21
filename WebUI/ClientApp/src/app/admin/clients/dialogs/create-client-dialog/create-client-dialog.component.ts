import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-client-dialog',
  templateUrl: './create-client-dialog.component.html',
  styleUrls: ['./create-client-dialog.component.sass']
})
export class CreateClientDialogComponent implements OnInit {

  createClientForm = new FormGroup({
    id: new FormControl(0),
    title: new FormControl(''),
    phone: new FormControl(''),
    legalEntity: new FormControl(''),
    clientType: new FormControl(0),
    numberOfCalls: new FormControl(0),
    numberOfShipments: new FormControl(0)
  })

  save(){
    this.dialogRef.close(this.createClientForm.value);
  }

  close(){
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<CreateClientDialogComponent>) { }

  ngOnInit() {
  }

}
