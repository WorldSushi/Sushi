import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { IWorkgroupPlans } from '../../../admin/workgroups/shared/models/workgroup-plans.model';
import { IWorkgroup } from '../../../admin/workgroups/shared/models/workgroup.model';
import { IWeekPlan } from '../../../manager-rm/clients/shared/models/week-plan.model';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { IClient } from '../../../manager-any/clients/shared/models/client.model';
import { IClientData } from '../Model/client-data.model';

@Component({
  selector: 'app-plan-task',
  templateUrl: './plan-task.component.html',
  styleUrls: ['./plan-task.component.sass']
})
export class PlanTaskComponent implements OnInit {

  //@Input() workgroupPlans: IWorkgroupPlans[];
  @Input() weekPlans: IWeekPlan[];
  @Input() workgroups: IWorkgroup[] = [];
  @Input() clientsDataFull: IClientData[] = [];

  displayedColumns: string[] = ['status', 'title', 'legalEntity', 'taskRM', 'taskMC', 'planRM', 'planMC', 'comentCon', 'comentCli']
  numberWeek: number = 1;
  numberMonthe: number = 9;
  numberYear: number = 2019;
  month: string = new Date().toDateString();
  dateCollections: string[] = [];
  dateCollection: string;
  workgroupId: number = 0;
  clientsData: IClientData[] = [];

  getClients() {
    this.http.get<IClientData[]>('api/conroler/ClientAccept/Client').subscribe((data: IClientData[]) => {
      this.clientsDataFull = data
      console.log(this.clientsData);
      this.getworkgroup()
    });
  }

  getworkgroup() {
    this.http.get<IWorkgroup[]>('api/admin/WorkGroup').subscribe((data: IWorkgroup[]) => {
      this.workgroups = data
      console.log(this.weekPlans);
      this.getworkgroupPlans();
    });
  }

  getworkgroupPlans() {
    this.http.get<IWeekPlan[]>('api/manager/WeekPlan').subscribe((data: IWeekPlan[]) => {
      this.weekPlans = data
      console.log(this.weekPlans);
      this.setSortWeeplan();
    });
  }

  setSortWeeplan() {
    this.clientsData = this.clientsDataFull.filter(c => this.workgroupId == 0 || this.workgroupId == c.workGroupeId);
    this.clientsData.forEach((item: IClientData) => {
      item.weeklyPlanSRegional = this.weekPlans.find(w => w.managerType == 20 && w.clientId == item.id && w.weekNumber == this.numberWeek
        && new Date(w.dateTime.split('.')[2] + "/" + w.dateTime.split('.')[1] + "/" + w.dateTime.split('.')[0]).getMonth() == this.numberMonthe
        && new Date(w.dateTime.split('.')[2] + "/" + w.dateTime.split('.')[1] + "/" + w.dateTime.split('.')[0]).getFullYear() == this.numberYear);
      item.weeklyPlanSEscort = this.weekPlans.find(w => w.managerType == 10 && w.clientId == item.id && w.weekNumber == this.numberWeek
        && new Date(w.dateTime.split('.')[2] + "/" + w.dateTime.split('.')[1] + "/" + w.dateTime.split('.')[0]).getMonth() == this.numberMonthe
        && new Date(w.dateTime.split('.')[2] + "/" + w.dateTime.split('.')[1] + "/" + w.dateTime.split('.')[0]).getFullYear() == this.numberYear);
      this.initDateArchiv();
    });
    console.log(this.clientsData);
  }

  setBagroundStatus(element) {
    if (element.callsComments) {
      if (element.callsComments.acceptControlerCalss == 2) {
        return element.callsComments.colorPen;
      }
      else if (element.callsComments.acceptControlerCalss == 1) {
        return "#DF013A";
      }
      else {
        return "#FAFAFA";
      }
    }
  }

  initDateArchiv() {
    if (this.dateCollections.length == 0) {
      this.dateCollections = [];
      let firstDate = new Date();
      for (let i = 0; i < this.weekPlans.length; i++) {
        let tmpDate = this.weekPlans[i].dateTime.split(".");
        if (firstDate > new Date(tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0])) {
          firstDate = new Date(tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0]);
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

  changeNumberWeek() {
    this.setSortWeeplan();
  }

  toFormatDate(dateSelect) {
    let partDate = dateSelect.split('.');
    let date = new Date(partDate[1] + "/" + partDate[0]);
    this.numberMonthe = date.getMonth();
    this.numberYear = date.getFullYear();
    this.setSortWeeplan();
  }

  selectedWorkGroupChange() {
    this.setSortWeeplan();
  }

  setNoAccept($event, clientId) {
    let comentControler = $event.currentTarget.offsetParent.children[0].value;
    if (comentControler != undefined || comentControler != "") {
      this.http.get('api/conroler/ClientAccept/NoAcceptCallWeekPlan?comment=' + comentControler + "&clientId=" + clientId).subscribe();
      $event.currentTarget.offsetParent.parentElement.children[0].style.backgroundColor = "#DF013A";
    }
  }

  setAccept($event, clientId) {
    let comentControler = $event.currentTarget.offsetParent.children[0].value;
    this.http.get('api/conroler/ClientAccept/DefaultCallWeekPlan?comment=' + comentControler + "&clientId=" + clientId).subscribe();
    $event.currentTarget.offsetParent.children[0].value = "";
    $event.currentTarget.offsetParent.parentElement.children[0].style.backgroundColor = "#FAFAFA";
  }

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getClients();
  }

}
