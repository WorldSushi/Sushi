import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';
import { IManager } from '../../shared/models/manager.model';
import { EditManagerDialogComponent } from '../edit-manager-dialog/edit-manager-dialog.component';

@Component({
  selector: 'app-detail-manager-dialog',
  templateUrl: './detail-manager-dialog.component.html',
  styleUrls: ['./detail-manager-dialog.component.sass']
})
export class DetailManagerDialogComponent implements OnInit {

  close(){
    this.dialogRef.close();
  }

  openManagerEdit() {
    const dialogRef = this.dialog.open(EditManagerDialogComponent, {
      width: '725px',
      data: this.data
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.dialogRef.close(res);
      }
    })
  }

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DetailManagerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
