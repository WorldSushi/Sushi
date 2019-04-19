import { Component, OnInit, Input, Inject } from '@angular/core';
import { Client } from '../../models/client.model';
import { MatDialog, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { ClientManager } from '../../models/clientManagers.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.sass']
})
export class ClientListComponent implements OnInit {

  @Input()
  clients: Client[];

  displayedColumns: string[] = [
    "id", 
    "title", 
    "phone",
    "plannedAmountCalls"
  ];

  clienManagersDialogOpen(clientId: number, clientTitle: string, managers: any[]){
    const dialogRef = this.dialog.open(ClientManagersDialog, {
      minWidth: '620px',
      data: {
        
      }
    })
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-client-managers-dialog',
  templateUrl: 'client-managers-dialog.html'
})
export class ClientManagersDialog {
  
  private dataSource = new MatTableDataSource<ClientManager>(this.data)

  private displayedColumns = [
    "login",
    "calls"
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
}
