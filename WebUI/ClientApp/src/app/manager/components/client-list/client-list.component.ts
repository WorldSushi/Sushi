import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { ClientWithCallPlan } from '../../models/clientWithCallPlan.model';
import { FormGroup, FormControl } from '@angular/forms';
import { MonthlyCallPlanService } from '../../services/monthlyCallPlan.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import * as moment from 'moment';
import { Call } from '../../models/call.model';
import { BusinessTripDialog } from './dialogs/business-trip/business-trip.dialog';
import { BusinessTripPlanService } from '../../services/businessTripPlan.service';
import { AmountBusinessTripDialog } from './dialogs/amount-business-trip/amount-business-trip.dialog';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.sass']
})
export class ClientListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input()
  public clients: ClientWithCallPlan[];

  public dataSource = new MatTableDataSource()

  displayedColumns: string[] = [
    "id",
    "title",
    "legalEntity", 
    "clientType",
    "numberOfCalls",
    "numberOfShipments",
    "phone", 
    "plannedAmountCalls",
    "plannedAmountTrips"
  ];

  callPlanningDisplayed: boolean = false;
  selectedClient = {
    id: 0,
    title: ""
  };

  callPlanningForm = new FormGroup({
    amountCalls: new FormControl(0)
  });

  callPlanningOpen(clientId: number, clientTitle: string) {
    this.selectedClient = {
      id: clientId,
      title: clientTitle,
    }
    
    const dialogRef = this.dialog.open(MonthlyCallPlanDialog, {
      width: '350px',
      data: { 
        Clientid: this.selectedClient.id,
        title: this.selectedClient.title,
        amountCalls: 0,
        month: new Date().getMonth() + 1
      }     
    })

    dialogRef.afterClosed().subscribe(result => {
      const monthlyCallPlan = result;

      this.callPlanningFormSubmit(monthlyCallPlan);
    });
  }
  
  callsOpen(clientId: number, clientTitle: string, calls: any[]) {
    this.selectedClient = {
      id: clientId,
      title: clientTitle,
    }
    
    const dialogRef = this.dialog.open(ManagerCallsDialog, {

      minWidth: '620px',

      data: { 
        clientid: this.selectedClient.id,
        title: this.selectedClient.title,
        calls: calls.map(item => {
          
          return {
            date: moment(new Date(item.start_time * 1000)).format("DD.MM.YYYY HH:MM"),
            duration: (Math.floor(item.duration / 60)).toString() + ":" + (item.duration % 60),
            record: item.recording
          }

        })
      }     
    })

    dialogRef.afterClosed().subscribe();
  }

  openTrips(clientId: number, clientTitle: string, trips: number, tripCompletedType: number, tripId: number) {
    this.selectedClient = {
      id: clientId,
      title: clientTitle,
    }
    
    const dialogRef = this.dialog.open(AmountBusinessTripDialog, {

      minWidth: '620px',

      data: { 
        id: tripId,
        clientid: this.selectedClient.id,
        title: this.selectedClient.title,
        trips: trips,
        businessTripCompletedType: tripCompletedType
      }     
    })

    dialogRef.afterClosed().subscribe(res => {
      this.businessTripPlanService.updateBusinessTripPlan(res).subscribe(res => {
        this.clients.find(item => item.id == res.clientId).businessTripCompletedType = res.businessTripCompletedType;
      });
    });
  }

  callPlanningFormSubmit(result) {
    this.monthlyCallPlanService.createMonthlyCallPlan(result).subscribe(res => this.clients
      .find(item => item.id == res.clientId).plannedAmountCalls = res.amountCalls);
  }

  openPlannedTrips(clientId, clientTitle) {
    this.selectedClient = {
      id: clientId,
      title: clientTitle,
    }
    
    const dialogRef = this.dialog.open(BusinessTripDialog, {
      width: '350px',
      data: { 
        Clientid: this.selectedClient.id,
        title: this.selectedClient.title,
        amountCalls: 0,
        month: new Date().getMonth() + 1
      }     
    })

    dialogRef.afterClosed().subscribe(result => {
      const monthlyTripPlan = result;

      this.tripsPlanningFormSubmit(monthlyTripPlan);
    });
  }

  tripsPlanningFormSubmit(monthlyTripPlan){
    this.businessTripPlanService.createBusinessTripPlan(monthlyTripPlan).subscribe(res => {
      this.clients.find(item => item.id == res.clientId).plannedAmountTrips = res.amountTrips
    });
  }

  constructor(public monthlyCallPlanService: MonthlyCallPlanService,
    public businessTripPlanService: BusinessTripPlanService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Элементов на странице';    
  } 

  ngOnChanges(): void {
    this.dataSource.data = this.clients;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}




// To Do вынести диалоги туда куда им место (не тут)

@Component({
  selector: 'app-monthly-call-plan-dialog',
  templateUrl: 'monthly-call-plan-dialog.html',
})
export class MonthlyCallPlanDialog {

  months: object[] = [
    { number: 1, title: 'Январь' },
    { number: 2, title: 'Февраль' },
    { number: 3, title: 'Март' },
    { number: 4, title: 'Апрель' },
    { number: 5, title: 'Май' },
    { number: 6, title: 'Июнь' },
    { number: 7, title: 'Июль' },
    { number: 8, title: 'Август' },
    { number: 9, title: 'Сентябрь' },
    { number: 10, title: 'Октябрь' },
    { number: 11, title: 'Ноябрь' },
    { number: 12, title: 'Декабрь' }
  ]

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<MonthlyCallPlanDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {}

    
}

@Component({
  selector: 'app-manager-calls-dialog',
  templateUrl: 'manager-calls-dialog.html',
})
export class ManagerCallsDialog {
 
  public dataSource = new MatTableDataSource(this.data.calls)

  public displayedColumns = [
    "date",
    "duration",
    "record"
  ]

  callsDialogClose(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<ManagerCallsDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {}
}