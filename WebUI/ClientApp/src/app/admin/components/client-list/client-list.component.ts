import { Component, OnInit, Input, Inject } from '@angular/core';
import { Client } from '../../models/client.model';
import { MatDialog, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ClientManager } from '../../models/clientManagers.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAdminState } from '../../store/states';
import { CreateClient, UpdateClient, DeleteClient } from '../../store/actions/client.action';
import { ManagerClientDialog } from './dialogs/manager-client/manager-client-dialog';
import { Manager } from '../../models/manager.model';
import { ChooseManagerDialog } from './dialogs/choose-manager/choose-manager-dialog';
import { ManagerClientService } from '../../services/manager-client.service';
import { BusinessTripDialog } from '../../../manager/components/client-list/dialogs/business-trip/business-trip.dialog';
import { BusinessTripPlanService } from '../../../manager/services/businessTripPlan.service';
import { ClientType } from 'src/app/shared/enums/client-type.enum';
import { NumberOfCalls } from 'src/app/shared/enums/number-of-calls.enum';
import { NumberOfShipments } from 'src/app/shared/enums/number-of-shipments.enum';
import { ManagerTripsDialog } from './dialogs/manager-trips/manager-trips-dialog';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.sass']
})
export class ClientListComponent implements OnInit {

  @Input()
  clients: Client[];
  @Input()
  managers: Manager[];

  @Input()
  loading: boolean;

  selectedClient =  {
    id: 0,
    title: ''
  }

  displayedColumns: string[] = [
    "id", 
    "title", 
    "legalEntity",
    "clientType",
    "numberOfCalls",
    "numberOfShipments",
    "phone",
    "plannedAmountCalls",
    "plannedAmountTrips",   
    "weekPlans",
    "action",
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
        phone: '',
        legalEntity: '',
        clientType: '',
        numberOfCalls: '',
        numberOfShipments: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.store.dispatch(new CreateClient({data: result}))

    });
  }

  detailClient(client){
    const dialogRef = this.dialog.open(ClientDetailDialog, {
      minWidth: '620px',
      data: {
        id: client.id,
        title: client.title,
        phone: client.phone,
        currentManagers: client.managers,
        managersForChoose: this.managers,
        legalEntity: client.legalEntity,
        clientType: client.clientType,
        numberOfCalls: client.numberOfCalls,
        numberOfShipments: client.numberOfShipments
      }
    });


    dialogRef.afterClosed().subscribe(result => {   
      if(!result)
        return
      
      this.managerClientService
        .bindManagers(result.form.id, result.currentManagers.map(item => item.id))
        .subscribe(res => {
          const editedClient = this.clients.find(item => item.id == result.form.id);
          editedClient.managers = result.currentManagers;

          const index = this.clients.findIndex(item => item.id == editedClient.id);
          
          this.clients = [...this.clients.slice(0, index), editedClient, ...this.clients.slice(index + 1)]

          this.store.dispatch(new UpdateClient({data: result.form}));
        })
    })
  }

  callPlanDetail(managers){
    const dialogRef = this.dialog.open(ManagerClientDialog, {
      minWidth: '620px',
      data: {
        managers: managers      
      }
    })
  }

  tripsPlanDetail(managers){
    const dialogRef = this.dialog.open(ManagerTripsDialog, {
      minWidth: '620px',
      data: {
        managers: managers
      }
    })
  }

  deleteClient(id: number) {
    this.store.dispatch(new DeleteClient({data: id}));
  }

  constructor(public dialog: MatDialog,
    private managerClientService: ManagerClientService,
    private store: Store<IAdminState>) { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-client-managers-dialog',
  templateUrl: 'client-managers-dialog.html'
})
export class ClientManagersDialog {
  
  public dataSource = new MatTableDataSource<ClientManager>(this.data)

  public displayedColumns = [
    "login",
    "calls"
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
}

@Component({
  selector: 'app-client-dialog',
  templateUrl: 'client-create-dialog.html',
})
export class ClientCreateDialog {
  public clientTypes = ClientType;
  public numbersOfCalls = NumberOfCalls;
  public numberOfShipments = NumberOfShipments;

  public createClientForm = new FormGroup({
    id: new FormControl(this.data.id),
    title: new FormControl(this.data.title),
    phone: new FormControl(this.data.phone),
    legalEntity: new FormControl(this.data.legalEntity),
    clientType: new FormControl(this.data.clientType),
    numberOfCalls: new FormControl(this.data.numberOfCalls),
    numberOfShipments: new FormControl(this.data.numberOfShipments)
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

@Component({
  selector: 'app-client-detail-dialog',
  templateUrl: 'client-detail-dialog.html'
})
export class ClientDetailDialog {
  public clientTypes = ClientType;
  public numbersOfCalls = NumberOfCalls;
  public numberOfShipments = NumberOfShipments;

  public detailClientForm = new FormGroup({
    id: new FormControl(this.data.id),
    title: new FormControl(this.data.title),
    phone: new FormControl(this.data.phone),
    legalEntity: new FormControl(this.data.legalEntity),
    clientType: new FormControl(this.data.clientType),
    numberOfCalls: new FormControl(this.data.numberOfCalls),
    numberOfShipments: new FormControl(this.data.numberOfShipments)
  })

  public dataSource = new MatTableDataSource(this.data.currentManagers);

  public displayedColumns = [
    "login",
    "action"
  ]

  save(): void {
    this.dialogRef.close({
      form: this.detailClientForm.value,
      currentManagers: this.data.currentManagers
    });
  }

  bindManager(): void {
    const dialogRef = this.dialog.open(ChooseManagerDialog, {
      minWidth: '620px',
      data: {
        managers: this.data.managersForChoose
      }
    })

    dialogRef.afterClosed().subscribe(res => {
      
      if(!res)
        return;

      this.data.currentManagers = [...this.data.currentManagers, res]

      this.dataSource = new MatTableDataSource(this.data.currentManagers);
    })
  }

  unbindManager(id: number): void {
    this.data.currentManagers = this.data.currentManagers.filter(item => item.id != id);

    this.dataSource = new MatTableDataSource(this.data.currentManagers);

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<ClientDetailDialog>, 
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) {
      console.log(this.detailClientForm)
    }

}