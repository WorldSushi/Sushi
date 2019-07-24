import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';
import { CreateClientDialogComponent } from '../../dialogs/create-client-dialog/create-client-dialog.component';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
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
  
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  displayedColumns: string[] = ['title', 'clientType', 'phone', 'numberOfCalls', 'numberOfShipments']
  dataSource: MatTableDataSource<IClient> = new MatTableDataSource(this.clients);

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
      width: '938px',
      data: { ...client }
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.clientUpdated.emit(res);
      }
    })
  }


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnChanges(changes): void {
    this.dataSource.data = this.clients;
    this.dataSource.paginator = this.paginator
  }

  

}
