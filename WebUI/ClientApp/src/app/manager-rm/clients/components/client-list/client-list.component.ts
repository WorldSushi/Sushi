import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
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
import { IColummn } from '../../../../admin/dirctory/shared/models/colummn.model';

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
    todayCalss: IClient[] = [];
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

    colummns: IColummn[] = [];

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
      'MSresults.sumAndMsg',
      'RMresults.sumAndMsg',
    'MSresults.sum',
    'RMresults.sum',
    'MSresults.call',
    'RMresults.call',
    'MSresults.Message',
    'RMresults.Message',
    'MSresults.WhatsApp',
    'RMresults.WhatsApp',
    'MSresults.Share',
    'RMresults.Share', 
      'colum1',
      'colum2',
      'colum3'
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
        if (res) {
            console.log(res);
            let countCallPlan: number = res.numberOfCalls == "10" ? 1 : res.numberOfCalls == "20" ? 2 : res.numberOfCalls == "30" ? 3 : res.numberOfCalls == "40" ? 4 : res.numberOfCalls == "50" ? 5
                : res.numberOfCalls == "60" ? 5 : res.numberOfCalls == "90" ? 8 : 0;
            this.clients.find(c => c.id == res.id).callPlan.totalCalls = countCallPlan;
            this.clients.find(c => c.id == res.id).callPlan.regionalManagerCalls = this.clients.find(c => c.id == res.id).callPlan.totalCalls - this.clients.find(c => c.id == res.id).callPlan.escortManagerCalls;
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
          if (newContact.EMclientContactId == 0 && newContact.MScallType != 0 && newContact)
          EMcontacts.push({
            contactType: newContact.MScallType,
            managerType: 10,
            clientId: newContact.clientId,
            id: newContact.Id
          }) 

        let newContacts = [...RMcontacts, ...EMcontacts]; 

        newContacts.forEach(item => {
            if (item.id != 0 || (item.id == 0 && (item.contactType != 40 && item.contactType != 10))) {
                if (item.managerType == 10) {
                    item.managerId = this.manager.workgroup.escortManagerId;
                }
                else if (item.managerType == 20) {
                    item.managerId = this.manager.workgroup.regionalManagerId;
                }
                if (this.clients.find(c => c.id == item.clientId).clientContacts.find(c => c.id == item.id)) {
                    this.clients.find(c => c.id == item.clientId).clientContacts.find(c => c.id == item.id).contactType = item.contactType;
                    if (item.managerType == 10) {
                        this.clients.find(c => c.id == item.clientId).managerCallsResults.escortCalls++;
                    }
                    else if (item.managerType == 20) {
                        this.clients.find(c => c.id == item.clientId).managerCallsResults.regionalCalls++;
                    }
                }
                this.callsDateCreated.emit(item);
                this.cdr.detectChanges();
            }
        });
      }
    })
  }

    removeContact(contact: ICallsDate[], id) {
        let contactTmp: ICallsDate[] = [];
        contact.forEach((itm) => {
            if (itm.id != id) {
                contactTmp.push(contact.splice(contact.indexOf(itm), 1)[0]);
            }
        });
        return contactTmp;
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
        let managerType = this.getTypeManager();
        const numberOfWeek = Math.ceil(new Date().getDate() / 7);
        let countChar = 0;
        let weekPlan = (weekPlans.find(item => item.managerType == managerType && numberOfWeek == item.weekNumber)
            ? weekPlans.find(item => item.managerType == 20 && numberOfWeek == item.weekNumber)
            : { plan: '' }).plan;
        if (weekPlan && weekPlan.length > 150) {
            weekPlan = weekPlan.substr(0, 150)
            weekPlan += "...";
        }
        return weekPlan;
    }

    getCurrentRmPlan(weekPlans: IWeekPlan[]) {
        let managerType = this.getTypeManager();
        const numberOfWeek = Math.ceil(new Date().getDate() / 7);
        let countChar = 0;
        let weekPlan = (weekPlans.find(item => item.managerType == managerType && numberOfWeek == item.weekNumber)
            ? weekPlans.find(item => item.managerType == 20 && numberOfWeek == item.weekNumber)
            : { fact: '' }).fact;
        if (weekPlan && weekPlan.length > 150) {
            weekPlan = weekPlan.substr(0, 150)
            weekPlan += "...";
        }
        return weekPlan;
    }

    getTypeManager() {
        let curWorkGroup = this.workgroup.find(w => w && w.regionalManagerId == this.manager.id || w.escortManagerId == this.manager.id)
        let managerType = 0;
        if (curWorkGroup && curWorkGroup.regionalManagerId == this.manager.id) {
            managerType = 20;
        }
        else if (curWorkGroup && curWorkGroup.escortManagerId == this.manager.id) {
            managerType = 10;
        }
        return managerType;
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
                c.managerType == 20 && c.contactType == 40).length : 0;
            this.clients[i].managerCallsResults.escortCalls = sortClients.length != 0 ? sortClients.filter(c =>
                c.managerType == 10 && c.contactType == 40).length : 0;

            this.clients[i].managerCallsResults.regionalMails = sortClients.length != 0 ? sortClients.filter(c =>
                c.managerType == 20 && c.contactType == 20).length : 0;
            this.clients[i].managerCallsResults.escortMails = sortClients.length != 0 ? sortClients.filter(c =>
                c.managerType == 10 && c.contactType == 20).length : 0;

            this.clients[i].managerCallsResults.regionalLetters = sortClients.length != 0 ? sortClients.filter(c =>
                c.managerType == 20 && c.contactType == 30).length : 0;
            this.clients[i].managerCallsResults.escortLetters = sortClients.length != 0 ? sortClients.filter(c =>
                c.managerType == 10 && c.contactType == 30).length : 0;

            this.clients[i].managerCallsResults.regionalResAndMsg = sortClients.length != 0 ? sortClients.filter(c =>
                c.managerType == 20 && (c.contactType == 30 || c.contactType == 20 || (c.durations >= 150 && c.contactType == 40))).length : 0;
            this.clients[i].managerCallsResults.escortResAndMsg = sortClients.length != 0 ? sortClients.filter(c =>
                c.managerType == 10 && (c.contactType == 30 || c.contactType == 20 || (c.durations >= 150 && c.contactType == 40))).length : 0;


            if (this.clients[i].managerCallsResults.escortCalls == 0 || this.clients[i].callPlan.escortManagerCalls == 0) {
                this.clients[i].managerCallsResults.escortRes = '-';
            }
            else if ((this.clients[i].managerCallsResults.escortCalls / this.clients[i].callPlan.escortManagerCalls) * 100 > 100) {
                this.clients[i].managerCallsResults.escortRes = 100 + '%';
            }
            else {
                this.clients[i].managerCallsResults.escortRes = ((this.clients[i].managerCallsResults.escortCalls / this.clients[i].callPlan.escortManagerCalls) * 100).toFixed(0) + '%';
            }

            if (this.clients[i].managerCallsResults.regionalCalls == 0 || this.clients[i].callPlan.regionalManagerCalls == 0) {
                this.clients[i].managerCallsResults.regionalRes = '-';
            }
            else if ((this.clients[i].managerCallsResults.regionalCalls / this.clients[i].callPlan.regionalManagerCalls) * 100 > 100) {
                this.clients[i].managerCallsResults.regionalRes = 100 + '%';
            }
            else {
                this.clients[i].managerCallsResults.regionalRes = ((this.clients[i].managerCallsResults.regionalCalls / this.clients[i].callPlan.regionalManagerCalls) * 100).toFixed(0) + '%';
            }

            if (this.colummns) {
                if (this.colummns[0].cellContacts && this.colummns[1].cellContacts && this.colummns[2].cellContacts) {
                    this.clients[i].directions = {
                        table1: this.colummns[0].cellContacts.find(c => c.clientId == this.clients[i].id) ? this.colummns[0].cellContacts.find(c => c.clientId == this.clients[i].id).data : "",
                        table1Id: this.colummns[0].id,
                        table1Type: this.colummns[0].typeDirectory,
                        table1Optins: this.colummns[0].optins.split(','),
                        table1Optin: this.colummns[0].cellContacts.find(c => c.clientId == this.clients[i].id) ? this.colummns[0].cellContacts.find(c => c.clientId == this.clients[i].id).data : 0,
                        table2: this.colummns[1].cellContacts.find(c => c.clientId == this.clients[i].id) ? this.colummns[1].cellContacts.find(c => c.clientId == this.clients[i].id).data : "",
                        table2Id: this.colummns[1].id,
                        table2Type: this.colummns[1].typeDirectory,
                        table2Optins: this.colummns[1].optins.split(','),
                        table2Optin: this.colummns[1].cellContacts.find(c => c.clientId == this.clients[i].id) ? this.colummns[1].cellContacts.find(c => c.clientId == this.clients[i].id).data : 0,
                        table3: this.colummns[2].cellContacts.find(c => c.clientId == this.clients[i].id) ? this.colummns[2].cellContacts.find(c => c.clientId == this.clients[i].id).data : "",
                        table3Id: this.colummns[2].id,
                        table3Type: this.colummns[2].typeDirectory,
                        table3Optins: this.colummns[2].optins.split(','),
                        table3Optin: this.colummns[2].cellContacts.find(c => c.clientId == this.clients[i].id) ? this.colummns[2].cellContacts.find(c => c.clientId == this.clients[i].id).data : 0,
                    }
                }
                else {
                    this.colummns[0].cellContacts = []; 
                    this.colummns[1].cellContacts = []; 
                    this.colummns[2].cellContacts = []; 
                    this.clients[i].directions = {
                        table1: this.colummns[0].cellContacts.find(c => c.clientId == this.clients[i].id) ? this.colummns[0].cellContacts.find(c => c.clientId == this.clients[i].id).data : "",
                        table1Id: this.colummns[0].id,
                        table1Type: this.colummns[0].typeDirectory,
                        table1Optins: this.colummns[0].optins.split(','),
                        table1Optin: this.colummns[0].cellContacts.find(c => c.clientId == this.clients[i].id) ? this.colummns[0].cellContacts.find(c => c.clientId == this.clients[i].id).data : 0,
                        table2: this.colummns[1].cellContacts.find(c => c.clientId == this.clients[i].id) ? this.colummns[1].cellContacts.find(c => c.clientId == this.clients[i].id).data : "",
                        table2Id: this.colummns[1].id,
                        table2Type: this.colummns[1].typeDirectory,
                        table2Optins: this.colummns[1].optins.split(','),
                        table2Optin: this.colummns[1].cellContacts.find(c => c.clientId == this.clients[i].id) ? this.colummns[1].cellContacts.find(c => c.clientId == this.clients[i].id).data : 0,
                        table3: this.colummns[2].cellContacts.find(c => c.clientId == this.clients[i].id) ? this.colummns[2].cellContacts.find(c => c.clientId == this.clients[i].id).data : "",
                        table3Id: this.colummns[2].id,
                        table3Type: this.colummns[2].typeDirectory,
                        table3Optins: this.colummns[2].optins.split(','),
                        table3Optin: this.colummns[2].cellContacts.find(c => c.clientId == this.clients[i].id) ? this.colummns[2].cellContacts.find(c => c.clientId == this.clients[i].id).data : 0,
                    }
                }
            }
        }
        console.log(this.clients);
    }

    getTableName(numberTable) {
        return this.colummns[numberTable].nameTable;
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

    checkCallForColor(element: IClient) {
        let color = "";
        if (this.todayCalss && this.todayCalss.filter(td => td.id == element.id).length != 0) {
            if (this.todayCalss.find(td => td.id == element.id).clientContacts.filter(c => c.contactType == 40
                && new Date(c.date.split(".")[2] + '/' + c.date.split(".")[1] + '/' + c.date.split(".")[0]).getDate() == new Date().getDate()).length != 0) {
                color = "#e0fee0";
            }
            else {
                color = "#e9e2f8";
            }
        }
        return color;
    }

    getCountPlanCall(group: number, typeManatger: number) {
        let client: IClient[] = this.clients.filter(c => group == -10 || c.group == group)
        let count: number = 0;
        if (typeManatger == 10) {
            client.forEach((item) => {
                count += Number(item.callPlan.regionalManagerCalls);
            });
        }
        else if (typeManatger == 20) {
            client.forEach((item) => {
                count += Number(item.callPlan.escortManagerCalls);
            });
        }
        else {
            client.forEach((item) => {
                count += Number(item.callPlan.totalCalls);
            });
        }
        return count;
    }

    getCountPlanTrip(group: number, type: number) {
        let client: IClient[] = this.clients.filter(c => group == -10 || c.group == group)
        let count: number = 0;
        if (type == 10) {
            client.forEach((item) => {
                if (item.tripPlan.completedType == 30) {
                    count += item.tripPlan.hours * 1;
                }
                else if (item.tripPlan.completedType == 20) {
                    count += item.tripPlan.hours * 0.5;
                }
                else if (item.tripPlan.completedType == 10) {
                    count += item.tripPlan.hours * 0.3;
                }
                else {
                    count += item.tripPlan.hours * 0;
                }
            });
        }
        else {
            client.forEach((item) => {
                count += Number(item.tripPlan.hours);
            });
        }
        return count.toFixed(2);
    }


    getCountCall(group: number, typeCall: number) {
        let client: any[] = this.clients.filter(c => group == -10 || c.group == group)
        let count = 0;
        if (typeCall == 10) {
            client.forEach((item) => {
                count += Number(item.managerCallsResults.escortTotalContacts);
            });
        }
        else if (typeCall == 20) {
            client.forEach((item) => {
                count += Number(item.managerCallsResults.regionalTotalContacts);
            });
        }
        else if (typeCall == 30) {
            client.forEach((item) => {
                count += Number(item.managerCallsResults.escortCalls);
            });
        }
        else if (typeCall == 40) {
            client.forEach((item) => {
                count += Number(item.managerCallsResults.regionalCalls);
            });
        }
        else if (typeCall == 50) {
            client.forEach((item) => {
                count += Number(item.managerCallsResults.escortMails);
            });
        }
        else if (typeCall == 60) {
            client.forEach((item) => {
                count += Number(item.managerCallsResults.regionalMails);
            });
        }
        else if (typeCall == 70) {
            client.forEach((item) => {
                count += Number(item.managerCallsResults.escortLetters);
            });
        }
        else if (typeCall == 80) {
            client.forEach((item) => {
                count += Number(item.managerCallsResults.regionalLetters);
            });
        }
        else if (typeCall == 110) {
            client.forEach((item) => {
                count += Number(item.managerCallsResults.escortResAndMsg);
            });
        }
        else if (typeCall == 120) {
            client.forEach((item) => {
                count += Number(item.managerCallsResults.regionalResAndMsg);
            });
        }
        else if (typeCall == 90) {
            let mail = 0;
            let WhatsApp = 0;
            let call = 0;
            let msgCount = 0;
            client.forEach((item) => {
                mail += Number(item.managerCallsResults.escortMails);
                WhatsApp += Number(item.managerCallsResults.escortLetters);
                call += Number(item.managerCallsResults.escortCalls);
            });
            msgCount = mail + WhatsApp;
            if (msgCount != 0) {
                let precent = 0;
                if (call > 0) {
                    let countMessgeAndCall = 0;
                    countMessgeAndCall = msgCount + call;
                    precent = (100 * msgCount) / countMessgeAndCall;
                    if (precent > 10) {
                        count = call + (countMessgeAndCall * 0.10);
                    }
                    else {
                        count = countMessgeAndCall;
                    }
                }
                else {
                    count = 0;
                }
            }
            else {
                count = call;
            }
            count = Number(count.toFixed(0));
            let planCall = this.getCountPlanCall(group, 20);
            if (count == 0) {
                count = 0;
            }
            else if (count >= planCall) {
                count = 100;
            }
            else {
                count = (count / planCall) * 100;
            }
        }
        else if (typeCall == 100) {
            let mail = 0;
            let WhatsApp = 0;
            let call = 0;
            let msgCount = 0;
            client.forEach((item) => {
                mail += Number(item.managerCallsResults.regionalMails);
                WhatsApp += Number(item.managerCallsResults.regionalLetters);
                call += Number(item.managerCallsResults.regionalCalls);
            });
            msgCount = mail + WhatsApp;
            if (msgCount != 0) {
                let precent = 0;
                if (call > 0) {
                    let countMessgeAndCall = 0;
                    countMessgeAndCall = msgCount + call;
                    precent = (100 * msgCount) / countMessgeAndCall;
                    if (precent > 10) {
                        count = call + (countMessgeAndCall * 0.10);
                    }
                    else {
                        count = countMessgeAndCall;
                    }
                }
                else {
                    count = 0;
                }
            }
            else {
                count = call;
            }
            count = Number(count.toFixed(0));
            let planCall = this.getCountPlanCall(group, 10);
            if (count == 0) {
                count = 0;
            }
            else if (count >= planCall) {
                count = 100;
            }
            else {
                count = (count / planCall) * 100;
            }
        }
        return count;
    }

    getColummns() {
        this.http.get<IColummn[]>('api/admin/Directory/Directory/').subscribe((data: IColummn[]) => {
            this.colummns = data;
            console.log(this.colummns);
        });
    }

    setData(data: string, id: number, cluentId: number) {
        this.http.get('api/admin/Directory/data?idTable=' + id + "&clientId=" + cluentId + "&data=" + data).subscribe();
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
    this.todayCalss = this.clients.filter(c => c.clientContacts && c.clientContacts.length != 0 && c.clientContacts
        .find(cc => new Date(cc.date.split(".")[2] + '/' + cc.date.split(".")[1] + '/' + cc.date.split(".")[0]).getDate() == new Date().getDate()
            && new Date(cc.date.split(".")[2] + '/' + cc.date.split(".")[1] + '/' + cc.date.split(".")[0]).getFullYear() == new Date().getFullYear()
            && new Date(cc.date.split(".")[2] + '/' + cc.date.split(".")[1] + '/' + cc.date.split(".")[0]).getMonth() == new Date().getMonth()
            && cc.durations >= 150 && cc.managerId == this.manager.id));
    this.dataSource.paginator = this.paginator;
      console.log(this.todayCalss);
      console.log(this.manager);
  }
  
  constructor(public dialog: MatDialog,
      private http: HttpClient,
      private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.getColummns();
  }

}
