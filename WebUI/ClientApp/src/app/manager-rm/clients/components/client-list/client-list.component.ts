import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { IClient } from '../../shared/models/client.model';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { CreateClientDialogComponent } from '../../dialogs/create-client-dialog/create-client-dialog.component';
import { EditClientDialogComponent } from '../../dialogs/edit-client-dialog/edit-client-dialog.component';
import { AnalysisDialogComponent } from '../../dialogs/analysis-dialog/analysis-dialog.component';
import { INomenclatureAnalysis } from '../../shared/models/nomenclature-analysis';
import { IRevenueAnalysis } from '../../shared/models/revenue-analysis';
import { IWeekPlan } from '../../shared/models/week-plan.model';
import { WeekPlansDialogComponent } from '../../dialogs/week-plans/week-plans-dialog.component';
import { CallsResultDialogComponent } from '../../dialogs/calls-result-dialog/calls-result-dialog.component';
import { ICallsDate } from '../../shared/models/calls-date.model';
import { CallsDatesDialogComponent } from '../../dialogs/calls-dates-dialog/calls-dates-dialog.component';
import { ICallPlan } from '../../shared/models/call-plan.model';
import { ITripPlan } from '../../shared/models/trip-plan.model';
import { weekPlanQueries } from 'src/app/store/clients/selectors/week-plan.selectors';
import { ninvoke } from 'q';
import { IManager } from 'src/app/admin/managers/shared/models/manager.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientListComponent implements OnInit {

  @Input() clients: IClient[];
  @Input() manager: any;

  @Output() clientCreated: EventEmitter<IClient> = new EventEmitter<IClient>();
  @Output() clientUpdated: EventEmitter<IClient> = new EventEmitter<IClient>();
  @Output() callPlanUpdated: EventEmitter<ICallPlan> = new EventEmitter<ICallPlan>();
  @Output() tripPlanHoursUpdated: EventEmitter<ITripPlan> = new EventEmitter<ITripPlan>();
  @Output() tripPlanCompletedTypeUpdated: EventEmitter<ITripPlan> = new EventEmitter<ITripPlan>();
  @Output() weekPlanUpdated: EventEmitter<IWeekPlan> = new EventEmitter<IWeekPlan>();
  @Output() weekPlanCreated: EventEmitter<IWeekPlan> = new EventEmitter<IWeekPlan>();
  @Output() weekPlanFactAdded: EventEmitter<IWeekPlan> = new EventEmitter<IWeekPlan>();
  @Output() callsDateCreated: EventEmitter<ICallsDate> = new EventEmitter<ICallsDate>();
  @Output() callPlanCreated: EventEmitter<ICallPlan> = new EventEmitter<ICallPlan>();
  @Output() tripPlanCreated: EventEmitter<ITripPlan> = new EventEmitter<ITripPlan>();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  dataSource: MatTableDataSource<IClient> = new MatTableDataSource(this.clients);
   
  displayedColumns: string[] = [
    'title', 
    'phone',
    'type', 
    'numberOfCalls', 
    'numberOfShipments',
    'callPlan.collective', 
    'callPlan.MS', 
    'callPlan.RM',
    'tripPlan.planned',
    'tripPlan.fact',
    'MSplanned',
    'RMplanned',
    'MSresults.sum',
    'RMresults.sum'   
  ];

  getTrackBy(index, item){
    return item.id;
  }

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
        this.updateClient(res);
      }
    })
  }

  updateClient(client: IClient) {
    this.clientUpdated.emit(client);
  }

  openNomenclatureAnalysis(client: IClient) {
    this.dialog.open(AnalysisDialogComponent, {
      width: '938px',
      data: {
        title: client.title,
        analysisTitle: 'Анализ по номенклатуре',
        analysis: client.nomenclatureAnalysis
      }
    })
  }

  openRevenueAnalysis(client: IClient) {
    this.dialog.open(AnalysisDialogComponent, {
      width: '938px',
      data: {
        title: client.title,
        analysisTitle: 'Анализ по выручке',
        analysis: client.revenueAnalysis
      }
    })
  }

  openWeekPlans(client: IClient){
    let dialogRef = this.dialog.open(WeekPlansDialogComponent, {
      width: '70%',
      data: {
        id: client.id,
        title: client.title,
        weekPlans: JSON.parse(JSON.stringify(client.weekPlans))
      }
    })

    const sub = dialogRef.componentInstance.addFact.subscribe(res => {
      this.weekPlanFactAdded.emit(res);
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        res.forEach(element => {
          if(element.id == 0)
            this.weekPlanCreated.emit(element);
          else if(element.id > 0)
            this.weekPlanUpdated.emit(element);

          sub.unsubscribe();
        });
      }
    })
  }

  openCallsResult(client: IClient){

    let dialogRef = this.dialog.open(CallsResultDialogComponent, {
      width: '938px',
      data: {
        title: client.title,
        MSresults: {
          calls: client.clientContacts.filter(item => item.contactType == 10 && item.managerType == 10).length,
          whatsUp: client.clientContacts.filter(item => item.contactType == 20 && item.managerType == 10).length,
          letters: client.clientContacts.filter(item => item.contactType == 30 && item.managerType == 10).length,
          sum: client.clientContacts.filter(item => item.contactType != 0 && item.managerType == 10).length
        },
        RMresults: {
          calls: client.clientContacts.filter(item => item.contactType == 10 && item.managerType == 20).length,
          whatsUp: client.clientContacts.filter(item => item.contactType == 20 && item.managerType == 20).length,
          letters: client.clientContacts.filter(item => item.contactType == 30 && item.managerType == 20).length,
          sum: client.clientContacts.filter(item => item.contactType > 0 && item.managerType == 20).length
        }
      }
                  
    })
  }

  openCallsDates(client: IClient){

    let dialogRef = this.dialog.open(CallsDatesDialogComponent, {
      width: '938px',
      data: {
        clientId: client.id,
        clientTitle: client.title,
        clientContacts: client.clientContacts
      } 
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        let newContacts = res.filter(item => (item.RMid == 0 && item.RMcallType != 0) || (item.EMid == 0 && item.MScallType != 0));
        newContacts = newContacts.map(item => {
          return {
            id: 0,
            clientId: item.clientId,
            date: item.date,
            contactType: item.EMid != 0 ? item.RMcallType : item.MScallType,
            managerType:  item.EMid != 0 ? 20 : 10,
          }
        })



        newContacts.forEach(item => {
          item.managerId = this.manager.id;
          this.callsDateCreated.emit(item);
        });

      }
    })
  }

  getAvgAnalysis(value: INomenclatureAnalysis | IRevenueAnalysis){

    const a = value.reportPrevMonth;
    const b = value.reportAvg5Months;
    const c = value.prevMonth;
    const d = value.avg5Months;

    return Math.round((a + b + c + d) / 4);
  }

  getCurrentMsPlan(weekPlans: IWeekPlan[]){
    const numberOfWeek = Math.ceil(new Date().getDate() / 7);

    return weekPlans.find(item => item.managerType == 10 && numberOfWeek == item.weekNumber) 
      ? weekPlans.find(item => item.managerType == 10 && numberOfWeek == item.weekNumber)
      : { plan: '' };
  }

  getCurrentRmPlan(weekPlans: IWeekPlan[]){
    const numberOfWeek = Math.ceil(new Date().getDate() / 7);

    return weekPlans.find(item => item.managerType == 20 && numberOfWeek == item.weekNumber)
      ? weekPlans.find(item => item.managerType == 20 && numberOfWeek == item.weekNumber)
      : { plan: '' };
  }

  getSumOfCallsDates(callsDates: ICallsDate[]){
    return callsDates.filter(item => item.contactType > 0).length;
  }

  updateCallPlan(callPlan: ICallPlan){
    if(callPlan.id == 0)
      this.callPlanCreated.emit(callPlan)
    else
      this.callPlanUpdated.emit(callPlan);
  }

  updateTripPlanHours(tripPlan: ITripPlan){
    if(tripPlan.id == 0)
      this.tripPlanCreated.emit(tripPlan);
    else
      this.tripPlanHoursUpdated.emit(tripPlan);
  }

  updateTripPlanCompletedType(tripPlan: ITripPlan){
    this.tripPlanCompletedTypeUpdated.emit(tripPlan);
  }
  

  getAnalysisProps(value) {
    if(value == 0){
      return {
        background: "#ac0800",
        font: "#384855",
        width: '30'
      } 
    }
    else if(value > 0 && value < 25){
      return {
        background: "#ffbc6d",
        font: "#384855",
        width: "40"
      }
    }
    else if(value >= 25 && value <= 49){
      return {
        background: "#fee789",
        font: "#384855",
        width: "50"
      }
    }
    else if(value > 49 && value <= 74){
      return {
        background: '#ebb4d3',
        font: '#384855',
        width: "70"
      }
    }
    else if(value > 74 && value <= 99){
      return {
        background: "#ccffc6",
        font: "#384855",
        width: "80"
      }
    }
    else if(value > 99 && value <= 124){
      return {
        background: "#85e5fe",
        font: "#384855",
        width: '100'
      }
    }
    else if(value > 124){
      return {
        background: "#85e5fe",
        font: "#384855",
        width: '100'
      }
    }
    else {
      '#fff'
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.dataSource.data = this.clients;
      this.dataSource.paginator = this.paginator;
  }
  
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}
