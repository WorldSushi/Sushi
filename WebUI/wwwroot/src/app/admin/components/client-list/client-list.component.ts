import { Component, OnInit, Input, Inject } from '@angular/core';
import { Client } from '../../models/client.model';
import { MatDialog, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ClientManager } from '../../models/clientManagers.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAdminState } from '../../store/states';
import { CreateClient, UpdateClient, DeleteClient } from '../../store/actions/client.action';

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
    "plannedAmountCalls",
    "action"
  ];

  clientManagersDialogOpen(clientId: number, clientTitle: string, managers: any[]){
    const dialogRef = this.dialog.open(ClientManagersDialog, {
      minWidth: '620px',
      data: {
        clientId: clientId,
        clienttitle: clientTitle,
        managers: managers
      }
    })
  }

  addNewClient() {
    const dialogRef = this.dialog.open(ClientCreateDialog, {
      minWidth: '620px',
      data: {
        title: '',
        phone: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.store.dispatch(new CreateClient({data: result}))

    });
  }

  editClient(client){
    const dialogRef = this.dialog.open(ClientCreateDialog, {
      minWidth: '620px',
      data: {
        title: client.title,
        phone: client.phone
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.store.dispatch(new UpdateClient({data: result}));

    })
  }

  deleteClient(id: number) {
    this.store.dispatch(new DeleteClient({data: id}));
  }

  constructor(public dialog: MatDialog,
    private store: Store<IAdminState>) { }

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

@Component({
  selector: 'app-manager-calls-dialog',
  templateUrl: 'client-create-dialog.html',
})
export class ClientCreateDialog {

  private createClientForm = new FormGroup({
    title: new FormControl(this.data.title),
    phone: new FormControl(this.data.phone)
  })

  save(): void {
    this.dialogRef.close(this.createClientForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<ClientCreateDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {}
}