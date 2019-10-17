import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-manager-dialog',
  templateUrl: './create-manager-dialog.component.html',
  styleUrls: ['./create-manager-dialog.component.sass']
})
export class CreateManagerDialogComponent implements OnInit {

  typeManager: number = 2;
  color = 13;

  createManagerForm = new FormGroup({
    id: new FormControl(0),
    login: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    typeManager: new FormControl(2),
    colorPen: new FormControl(13),
  })

  save(){
    this.dialogRef.close(this.createManagerForm.value);
  }

  close(){
    this.dialogRef.close();
  }

  getHidden(value) {
    console.log(value);
  }



  constructor(public dialogRef: MatDialogRef<CreateManagerDialogComponent>) { }

  ngOnInit() {
  }

}
