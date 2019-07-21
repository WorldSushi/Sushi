import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';

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

  constructor(
      public dialogRef: MatDialogRef<EditClientDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: IClient
    ) { }

  ngOnInit() {
  }

}
