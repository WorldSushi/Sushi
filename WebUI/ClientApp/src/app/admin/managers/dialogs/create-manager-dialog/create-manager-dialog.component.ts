import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-manager-dialog',
  templateUrl: './create-manager-dialog.component.html',
  styleUrls: ['./create-manager-dialog.component.sass']
})
export class CreateManagerDialogComponent implements OnInit {

  createManagerForm = new FormGroup({
    id: new FormControl(0),
    login: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),

  })

  save(){
    this.dialogRef.close(this.createManagerForm.value);
  }

  close(){
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<CreateManagerDialogComponent>) { }

  ngOnInit() {
  }

}
