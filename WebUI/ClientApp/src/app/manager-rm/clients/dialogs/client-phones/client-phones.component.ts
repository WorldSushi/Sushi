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

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ClientPhonesComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
