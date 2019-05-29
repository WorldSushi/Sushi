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
import { WeekPlanDialog } from './dialogs/weekplan/weekplan-dialog';
import { WeekPlanService } from '../../services/weekPlan.service';


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

  getTestClients(){
    let clients = [];
    for(let i = 0; i < 300; i ++){
      clients.push({
        id: i,
        title: 'Тест: ' + i.toString(),
        legalEntity: 'Юр лицо',
        clientType: 10,
        numberOfCalls: 10,
        numberOfShipments: 10,
        phone: '123-45-67',
        amountCalls: 10,
        amountTrips: 1,
        plannedAmountCalls: '10',
        plannedAmountTrips: '10',
        weekPlans: '10',
        day1: '1 | 2',
        day2: '1 | 3',
        day3: '1 | 1',
        day4: '1 | 1',
        day5: '1 | 1',
        day6: '1 | 1',
        day7: '1 | 1',
        day8: '1 | 1',
        day9: '3 | 3',
        day10: '4 | 4',
        day11: '1 | 2',
        day12: '1 | 3',
        day13: '1 | 1',
        day14: '1 | 1',
        day15: '1 | 1',
        day16: '1 | 1',
        day17: '1 | 1',
        day18: '1 | 1',
        day19: '3 | 3',
        day20: '4 | 4',
        day21: '1 | 2',
        day22: '1 | 3',
        day23: '1 | 1',
        day24: '1 | 1',
        day25: '1 | 1',
        day26: '1 | 1',
        day27: '1 | 1',
        day28: '1 | 1',
        day29: '3 | 3',
        day30: '4 | 4',
        resultMS: '10 | 10 | 10 | 30',
        resultRM: '10 | 10 | 10 | 30',
        contractResult: '1 | 1'
      })
    }

    return clients;
  }

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
    "plannedAmountTrips",
    "weekPlans",
    "day1",
    "day2",
    "day3",
    "day4",
    "day5",
    "day6",
    "day7",
    "day8",
    "day9",
    "day10",
    "day11",
    "day12",
    "day13",
    "day14",
    "day15",
    "day16",
    "day17",
    "day18",
    "day19",
    "day20",
    "day21",
    "day22",
    "day23",
    "day24",
    "day25",
    "day26",
    "day27",
    "day28",
    "day29",
    "day30",
    "resultMS",
    "resultRM",
    "contractResult"
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

  openWeekPlan(clientId: number, clientTitle: string, weekPlans: any[]){
    this.selectedClient = {
      id: clientId,
      title: clientTitle,
    }

    const dialogRef = this.dialog.open(WeekPlanDialog, {

      minWidth: '620px',

      data: { 
        clientId: this.selectedClient.id,
        title: this.selectedClient.title,
        weekPlans: weekPlans
      }     
    })

    dialogRef.afterClosed().subscribe(result => {
      
      if(!result)
        return;

      if(result.weeks.filter(item => item.id == 0 && item.plan != '').length > 0){
        this.weekPlanService.createWeekPlans(result.weeks.filter(item => item.id == 0 && item.plan != '')).subscribe(res => {
          const client = this.clients.find(item => item.id == res[0].clientId);
          client.weekPlans = res;
        });
      }

      if(result.editedWeeks.length > 0){
        this.weekPlanService.putWeekPlan(result.weeks.filter(item => result.editedWeeks.includes(item.id))).subscribe(res => res)
      }
      
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
    public weekPlanService: WeekPlanService,
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