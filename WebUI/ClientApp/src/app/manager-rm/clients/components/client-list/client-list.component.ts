import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IClient } from '../../shared/models/client.model';
import { MatDialog } from '@angular/material';
import { CreateClientDialogComponent } from '../../dialogs/create-client-dialog/create-client-dialog.component';
import { EditClientDialogComponent } from '../../dialogs/edit-client-dialog/edit-client-dialog.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.sass']
})
export class ClientListComponent implements OnInit {

  @Input() clients: IClient[];

  @Output() clientCreated: EventEmitter<IClient> = new EventEmitter<IClient>();
  @Output() clientUpdated: EventEmitter<IClient> = new EventEmitter<IClient>();
   
  displayedColumns: string[] = [
    'id', 
    'title', 
    'type', 
    'numberOfCalls', 
    'numberOfShipments', 
    'callPlan.collective', 
    'callPlan.MS', 
    'callPlan.RM',
    'tripPlan.planned',
    'tripPlan.fact'
  ];

  openCreateClientForm() {
    const dialogRef = this.dialog.open(CreateClientDialogComponent, {
      width: '725px'
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.clientCreated.emit(res);
      }
    })
  }

  openEditClientForm(client: IClient) {
    const dialogRef = this.dialog.open(EditClientDialogComponent, {
      width: '725px',
      data: { ...client }
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.updateClient(res);
      }
    })
  }

  updateClient(client: IClient) {
    this.clientUpdated.emit(client);
  }
  
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}
