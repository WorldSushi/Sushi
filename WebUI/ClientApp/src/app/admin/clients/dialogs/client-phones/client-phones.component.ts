import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-client-phones',
  templateUrl: './client-phones.component.html',
  styleUrls: ['./client-phones.component.sass']
})
export class ClientPhonesComponent implements OnInit {

  save(){
    this.dialogRef.close(this.data);
  }

  close(){
    this.dialogRef.close();
  }

  addPhone(){
    this.data.phones.push({
      id: 0,
      phone: '',
      clientId: this.data.clientId
    })
  }

  removePhone(phone){
    phone.deleted = true;
  }

  getPhones(){
    return this.data.phones.filter(item => item.deleted != true)
  }

  constructor(public dialogRef: MatDialogRef<ClientPhonesComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
