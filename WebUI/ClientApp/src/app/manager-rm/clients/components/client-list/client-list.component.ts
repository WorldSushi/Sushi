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
import { IWorkgroup } from '../../../../admin/workgroups/shared/models/workgroup.model';
import { HttpClient } from '@angular/common/http';
import { CorrectionResponseComponent } from '../../dialogs/correction-response/correction-response.component';
import { last } from 'rxjs/operators';
import { debug } from 'util';
import { IUser } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientListComponent implements OnInit {

  @Input() workgroup: IWorkgroup[];
  @Input() clients: any[];
  @Input() manager: IUser;

  @Output() clientCreated: EventEmitter<IClient> = new EventEmitter<IClient>();
  @Output() clientUpdated: EventEmitter<IClient> = new EventEmitter<IClient>();
  @Output() callPlanUpdated: EventEmitter<ICallPlan> = new EventEmitter<ICallPlan>();
  @Output() tripPlanHoursUpdated: EventEmitter<ITripPlan> = new EventEmitter<ITripPlan>();
  @Output() tripPlanCompletedTypeUpdated: EventEmitter<ITripPlan> = new EventEmitter<ITripPlan>();
  @Output() weekPlanUpdated: EventEmitter<IWeekPlan> = new EventEmitter<IWeekPlan>();
  @Output() weekPlanCreated: EventEmitter<IWeekPlan> = new EventEmitter<IWeekPlan>();
  @Output() weekPlanFactAdded: EventEmitter<IWeekPlan> = new EventEmitter<IWeekPlan>();
  @Output() weekGet: EventEmitter<IWeekPlan> = new EventEmitter<IWeekPlan>();
  @Output() callsDateCreated: EventEmitter<ICallsDate> = new EventEmitter<ICallsDate>();
  @Output() callPlanCreated: EventEmitter<ICallPlan> = new EventEmitter<ICallPlan>();
  @Output() tripPlanCreated: EventEmitter<ITripPlan> = new EventEmitter<ITripPlan>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource: MatTableDataSource<IClient> = new MatTableDataSource(this.clients);

  selectedGroup: any = -10;

  //actualLength: number;
  todayCalss: MatTableDataSource<IClient> = new MatTableDataSource(this.clients);

  actual: MatTableDataSource<IClient> = new MatTableDataSource(this.clients);

  //recordShipmentLength: number;
  recordShipment: MatTableDataSource<IClient> = new MatTableDataSource(this.clients);

  //restaurantsLength: number;
  restaurants: MatTableDataSource<IClient> = new MatTableDataSource(this.clients);

  //newOrResuscitatingLength: number;
  newOrResuscitating: MatTableDataSource<IClient> = new MatTableDataSource(this.clients);

  //notDeterminedLength: number;
  notDetermined: MatTableDataSource<IClient> = new MatTableDataSource(this.clients);

  //notDeterminedLength: number;
  other: MatTableDataSource<IClient> = new MatTableDataSource(this.clients);

  hidenDivFull = false;
  hidenDivSrrch = true;
  fullClientContacts: ICallsDate[];
  dateCollections: string[] = [];
  numberMonthe: number = 0;
  numberYear: number = 0;

  dateCollection: string;

  displayedColumns: string[] = [
    'status',
    'elect',
    'title', 
    'phone',
    'callPlan.collective', 
    'callPlan.MS', 
    'callPlan.RM',
    'tripPlan.planned',
    'tripPlan.fact',
    'MSplanned',
    'RMplanned',
    'MSresults.sum',
    'RMresults.sum',
    'MSresults.call',
    'RMresults.call',
    'MSresults.Message',
    'RMresults.Message',
    'MSresults.WhatsApp',
    'RMresults.WhatsApp',
    'MSresults.Share',
    'RMresults.Share' 
  ];

  clientsTmp: IClient[] = [];
  clientsTmp1: IClient[] = [];
  selectedWorkGroupChange() {
    if (this.selectedGroup == -10) {
      this.hidenDivFull = false;
      this.hidenDivSrrch = true;
    }
    else {
      this.clientsTmp = [];
      this.clientsTmp1 = [];
      for (let i = 0; i < this.workgroup[this.selectedGroup].clientIds.length; i++) {
        this.clientsTmp = this.clients.filter(c => c.id == this.workgroup[this.selectedGroup].clientIds[i]);
        for (let j = 0; j < this.clientsTmp.length; j++) {
          this.clientsTmp1.push(this.clientsTmp[j]);
        }
      }
      this.dataSource.data = this.clientsTmp1;
      this.dataSource.paginator = this.paginator;
      this.hidenDivFull = true;
      this.hidenDivSrrch = false;
    }
  }

  applyFilter(filterValue: string) {
    if (filterValue != "") {
      this.hidenDivFull = true;
      this.hidenDivSrrch = false;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    else {
      this.hidenDivFull = false;
      this.hidenDivSrrch = true;
    }
  }

  getTrackBy(index, item){
    return item.id;
  }

  getClientsGroups(){
    let allGroups = this.clients.map(item => item.group);
    
    let result = [...new Set(allGroups)];

    return result;
  }

  selectedGroupChange(){
    
    if(this.selectedGroup == -10 || this.selectedGroup == '-10'){
      this.dataSource.data = this.clients;
      this.dataSource.paginator = this.paginator;
    }
    else {
      this.dataSource.data = this.clients.filter(item => item.group == this.selectedGroup);
      this.dataSource.paginator = this.paginator;
    }
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
      width: '95%',
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
          calls: client.clientContacts.filter(item => item.contactType == 10 && item.managerType == 10 && item.durations >= 150).length,
          whatsUp: client.clientContacts.filter(item => item.contactType == 20 && item.managerType == 10 && item.durations >= 150).length,
          letters: client.clientContacts.filter(item => item.contactType == 30 && item.managerType == 10 && item.durations >= 150).length,
          sum: client.clientContacts.filter(item => item.contactType != 0 && item.managerType == 10 && item.durations >= 150).length
        },
        RMresults: {
          calls: client.clientContacts.filter(item => item.contactType == 10 && item.managerType == 20 && item.durations >= 150).length,
          whatsUp: client.clientContacts.filter(item => item.contactType == 20 && item.managerType == 20 && item.durations >= 150).length,
          letters: client.clientContacts.filter(item => item.contactType == 30 && item.managerType == 20 && item.durations >= 150).length,
          sum: client.clientContacts.filter(item => item.contactType > 0 && item.managerType == 20 && item.durations >= 150).length
        }
      }
                  
    })
  }

  openCallsDates(client: IClient) {;
    let dialogRef = this.dialog.open(CallsDatesDialogComponent, {
      width: '938px',
      height: '98%',
      data: {
        clientId: client.id,
        clientTitle: client.title,
        clientContacts: client.clientContacts.filter(item => item.durations >= 150 || (item.contactType == 30 || item.contactType == 20))
      } 
    })
    console.log(client.clientContacts.filter(item => item.durations >= 150));
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let newContact = res.find(item => (item.RMclientContactId == 0 && item.RMcallType != 0) || (item.EMclientContactId == 0 && item.MScallType != 0));

        let RMcontacts = [];
        if (newContact.RMclientContactId == 0 && newContact.RMcallType != 0)
          RMcontacts.push({
            contactType: newContact.RMcallType,
            managerType: 20,
            clientId: newContact.clientId,
            id: newContact.Id
          }) 

        let EMcontacts = []
        if (newContact.EMclientContactId == 0 && newContact.MScallType != 0)
          EMcontacts.push({
            contactType: newContact.MScallType,
            managerType: 10,
            clientId: newContact.clientId,
            id: newContact.Id
          }) 

        let newContacts = [...RMcontacts, ...EMcontacts]; 

        newContacts.forEach(item => {
          debugger
          if (item.managerType == 10) {
            item.managerId = this.manager.workgroup.escortManagerId;
          }
          else if (item.managerType == 20) {
            item.managerId = this.manager.workgroup.regionalManagerId;
          }
          this.callsDateCreated.emit(item);
        });
        location.reload();
      }
    })
  }


  OpenCorrectionResponse(idClient, title) {
    if (this.clients.find(r => r.id == idClient).callsComments.length != 0) {
      const dialogRef = this.dialog.open(CorrectionResponseComponent, {
        width: '1500px',
        data: {
          title: title,
          callsComments: this.clients.find(r => r.id == idClient).callsComments //? this.clients.find(r => r.clientId == idClient).callsComments : null,
        }
      })
    }
  }

  getAvgAnalysis(value: INomenclatureAnalysis | IRevenueAnalysis){

    const a = value.reportPrevMonth;
    const b = value.reportAvg5Months;
    const c = value.prevMonth;
    const d = value.avg5Months;

    return Math.round((a + b + c + d) / 4);
  }

  getCurrentMsPlan(weekPlans: IWeekPlan[]) {
    const numberOfWeek = Math.ceil(new Date().getDate() / 7);
    let weekPlan = (weekPlans.find(item => item.managerType == 10 && numberOfWeek == item.weekNumber)
      ? weekPlans.find(item => item.managerType == 10 && numberOfWeek == item.weekNumber)
      : { plan: '' }).plan;
    if (weekPlan.length > 150) {
      weekPlan = weekPlan.substr(0, 150)
      weekPlan += "...";
    }
    return weekPlan;
  }

  getCurrentRmPlan(weekPlans: IWeekPlan[]){
    const numberOfWeek = Math.ceil(new Date().getDate() / 7);
    let countChar = 0;
    let weekPlan = (weekPlans.find(item => item.managerType == 20 && numberOfWeek == item.weekNumber)
      ? weekPlans.find(item => item.managerType == 20 && numberOfWeek == item.weekNumber)
      : { plan: '' }).plan;
    if (weekPlan.length > 150) {
      weekPlan = weekPlan.substr(0, 150)
      weekPlan += "...";
    }
    //if (weekPlan.length > 40) {
    //  for (let i = 0; i < weekPlan.length / 40; i++) {
    //    for (let j = (i + 1) * 40; j < ((i + 1) * 40) + 40; j++) {
    //      if (weekPlan[j] == " ") {
    //        countChar++;
    //        if (countChar == 11) {
    //          countChar = 0;
    //          weekPlan[j] == " "
    //        }
    //      }
    //    }
    //  }
    //}
    return weekPlan;
  }

  getSumOfCallsDates(callsDates: ICallsDate[]){
    return callsDates.filter(item => item.contactType > 0).length;
  }

  updateCallPlan(callPlan: ICallPlan) {
    debugger
    if(callPlan.id == 0)
      this.callPlanCreated.emit(callPlan)
    else
      this.callPlanUpdated.emit(callPlan);
  }

  updateTripPlanHours(tripPlan: ITripPlan) {
    debugger
    if(tripPlan.id == 0)
      this.tripPlanCreated.emit(tripPlan);
    else
      this.tripPlanHoursUpdated.emit(tripPlan);
  }

  updateTripPlanCompletedType(tripPlan: ITripPlan) {
    debugger
    this.tripPlanCompletedTypeUpdated.emit(tripPlan);
  }

  sorDataClients(year: number, month: number) {
    for (let i = 0; i < this.clients.length; i++) {
      this.clients[i].managerCallsResults.escortCalls = 0;
      this.clients[i].managerCallsResults.escortTotalContacts = 0;
      this.clients[i].managerCallsResults.regionalCalls = 0;
      this.clients[i].managerCallsResults.regionalTotalContacts = 0;
      let sortClients = this.clients[i].clientContacts.filter(c =>
        new Date(c.date.split(".")[2] + '/' + c.date.split(".")[1] + '/' + c.date.split(".")[0]).getMonth() == month
        && new Date(c.date.split(".")[2] + '/' + c.date.split(".")[1] + '/' + c.date.split(".")[0]).getFullYear() == year);


      this.clients[i].managerCallsResults.escortTotalContacts = sortClients.length != 0 ? sortClients.filter(c =>
        c.managerType == 10 && c.durations > 149 && c.contactType != 50).length : 0;
      this.clients[i].managerCallsResults.regionalTotalContacts = sortClients.length != 0 ? sortClients.filter(c =>
        c.managerType == 20 && c.durations > 149 && c.contactType != 50).length : 0;

      this.clients[i].managerCallsResults.regionalCalls = sortClients.length != 0 ? sortClients.filter(c =>
        c.managerType == 20 && c.contactType == 10 || c.contactType == 40).length : 0;
      this.clients[i].managerCallsResults.escortCalls = sortClients.length != 0 ? sortClients.filter(c =>
        c.managerType == 10 && c.contactType == 10 || c.contactType == 40).length : 0;

      this.clients[i].managerCallsResults.regionalMails = sortClients.length != 0 ? sortClients.filter(c =>
        c.managerType == 20 && c.contactType == 20).length : 0;
      this.clients[i].managerCallsResults.escortMails = sortClients.length != 0 ? sortClients.filter(c =>
        c.managerType == 10 && c.contactType == 20).length : 0;

      this.clients[i].managerCallsResults.regionalLetters = sortClients.length != 0 ? sortClients.filter(c =>
        c.managerType == 20 && c.contactType == 30).length : 0;
      this.clients[i].managerCallsResults.escortLetters = sortClients.length != 0 ? sortClients.filter(c =>
        c.managerType == 10 && c.contactType == 30).length : 0;

      if (this.clients[i].managerCallsResults.escortTotalContacts == 0) {
        this.clients[i].managerCallsResults.escortRes = '-';
      }
      else if ((this.clients[i].managerCallsResults.escortTotalContacts / this.clients[i].callPlan.escortManagerCalls) > 100) {
        this.clients[i].managerCallsResults.escortRes = 100+'%';
      }
      else {
        this.clients[i].managerCallsResults.escortRes = ((this.clients[i].managerCallsResults.escortTotalContacts / this.clients[i].callPlan.escortManagerCalls) * 100).toFixed(2) + '%';
      }

      if (this.clients[i].managerCallsResults.regionalTotalContacts == 0) {
        this.clients[i].managerCallsResults.regionalRes = '-';
      }
      else if (this.clients[i].managerCallsResults.regionalTotalContacts / this.clients[i].callPlan.regionalManagerCalls > 100) {
        this.clients[i].managerCallsResults.regionalRes = 100+'%';
      }
      else {
        this.clients[i].managerCallsResults.regionalRes = ((this.clients[i].managerCallsResults.regionalTotalContacts / this.clients[i].callPlan.regionalManagerCalls) * 100).toFixed(2) + '%';
      }

    }
    console.log(this.clients);
  }

  initDateArchiv() {
    if (this.clients.length != 0) {
      if (this.clients.find(c => c.clientContacts.find(cc => cc.length != 0)) && this.clients.find(c => c.clientContacts.find(cc => cc.length != 0)).length != 0 && this.dateCollections.length == 0) {
        this.dateCollections = [];
        let firstDate = new Date();
        for (let i = 0; i < this.clients.length; i++) {
          for (let j = 0; j < this.clients[i].clientContacts.length; j++) {
            let tmpDate = this.clients[i].clientContacts[j].date.split(".");
            if (firstDate > new Date(tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0])) {
              firstDate = new Date(tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0]);
            }
          }
        }
        for (let i = firstDate.getFullYear(); i <= new Date().getFullYear(); i++) {
          for (let j = firstDate.getMonth(); j <= new Date().getMonth(); j++) {
            let date = new Date(i + "/0" + (j + 1));
            this.dateCollections.unshift(new Date(i + "/0" + (j + 1)).toLocaleDateString().substring(3, date.toLocaleDateString().length));
          }
        }
        this.dateCollection = this.dateCollections[0];
      }
    }
  }

  toFormatDate(dateSelect) {
    let partDate = dateSelect.split('.');
    let date = new Date(partDate[1] + "/" + partDate[0]);
    this.numberMonthe = date.getMonth();
    this.numberYear = date.getFullYear();
    this.sorDataClients(date.getFullYear(), date.getMonth());
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

  checkFluency(element: IClient) {
    console.log(element.isCoverage);
    if (element.isCoverage) {
      element.isCoverage = false;
    }
    else {
      element.isCoverage = true;
    }
    this.http.get('api/manager/Client/Coverage?isCoverage=' + element.isCoverage + "&idClient=" + element.id).subscribe();
  }

  setBagroundStatus(element) {
    if (element.callsComments) 
    {
      if (element.callsComments.length != 0) {
        return "#DF013A";
      }
      else {
        return "#FAFAFA";
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const toMonth = new Date().getMonth();
    const toYear = new Date().getFullYear();
    this.sorDataClients(toYear, toMonth);
    this.initDateArchiv();
    this.actual.data = this.clients.filter(c => c.group == 10);
    this.recordShipment.data = this.clients.filter(c => c.group == 20);
    this.restaurants.data = this.clients.filter(c => c.group == 40);
    this.newOrResuscitating.data = this.clients.filter(c => c.group == 30);
    this.notDetermined.data = this.clients.filter(c => c.group == 0);
    this.other.data = this.clients.filter(c => c.group == 50);
    this.dataSource.data = this.clients;
    this.todayCalss.data = this.clients.filter(c => c.clientContacts && c.clientContacts.length != 0 && c.clientContacts
      .find(cc => new Date(cc.date.split(".")[2] + '/' + cc.date.split(".")[1] + '/' + cc.date.split(".")[0]).getDate() == new Date().getDate()
        && cc.durations >= 150));
    this.dataSource.paginator = this.paginator;
    console.log(this.todayCalss.data);
  }
  
  constructor(public dialog: MatDialog,
    private http: HttpClient) { }

  ngOnInit() {
  }

}
