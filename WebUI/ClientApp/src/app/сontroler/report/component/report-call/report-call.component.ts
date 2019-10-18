import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ClientAccept } from '../../../../manager-rm/clients/shared/models/client-accep.modelt';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { IManager } from '../../../../admin/managers/shared/models/manager.model';
import { IWorkgroup } from '../../../../admin/workgroups/shared/models/workgroup.model';

@Component({
  selector: 'app-report-call',
  templateUrl: './report-call.component.html',
  styleUrls: ['./report-call.component.sass']
})
export class ReportCallComponent implements OnInit {


  @Input() managers: IManager[] = [];
  @Input() clientAcceptFull: ClientAccept[] = [];
  @Input() workgroup: IWorkgroup[] = [];

  calendarHidden: string = "hidden";
  dateStart: Date = new Date();
  dateEnd: Date = new Date();
  btnDate: string = this.dateStart.toLocaleDateString() + " - " + this.dateEnd.toLocaleDateString();
  durationTxt: number = -1;
  manager: number = 0;
  statistickCallModel: any[] = [];

  getcallsDater() {
    this.http.get<ClientAccept[]>('api/conroler/ClientAccept/').subscribe((data: ClientAccept[]) => {
      this.clientAcceptFull = data;
      console.log(this.clientAcceptFull);
      this.sortCall();
      this.cdr.detectChanges();
    });
  }

  getWorkGroup() {
    this.http.get<IWorkgroup[]>('api/admin/WorkGroup').subscribe((data: IWorkgroup[]) => {
      this.workgroup = data;
      console.log(this.workgroup);
      this.getcallsDater();
      this.cdr.detectChanges();
    });
  }

  sortCall() {
    this.statistickCallModel = [];
    this.workgroup.forEach((item: IWorkgroup) => {
      let clientAccept = this.clientAcceptFull.filter(c => (c.managerId == item.escortManagerId || c.managerId == item.regionalManagerId) && item.clientIds.indexOf(c.clientId) != -1
        && (this.durationTxt == -1 || this.durationTxt == c.durations));
      this.statistickCallModel.push({
        workgroupId: item.id,
        title: item.title,
        escortManagerId: item.escortManagerId,
        escortManagerName: item.escortManagerName,
        regionalManagerId: item.regionalManagerId,
        regionalManagerName: item.regionalManagerName,
        clientAccepts: clientAccept
      });
    });
    console.log(this.statistickCallModel);
  }

  changeManager(manager) {
     
  }

  applyFilterDuration(filterValue: string) {
    let rep = /[-\.;":'a-zA-Zа-яА-Я]/;
    let temValue = 0;
    if (filterValue != "" && !rep.test(filterValue)) {
      temValue = Number(filterValue);
    }
    else {
      temValue = -1;
    }
    if (this.durationTxt != temValue) {
      this.durationTxt = temValue;
    }
    this.sortCall();
  }

  verifyRange(dates: Date[]) {
    if (dates && dates.length != 0) {
      this.dateStart = dates[0];
      this.dateEnd = dates[dates.length - 1];
      this.btnDate = this.dateStart.toLocaleDateString() + " - " + this.dateEnd.toLocaleDateString();
      this.sortCall();
    }
  }

  hiddenCalendar() {
    if (this.calendarHidden == "hidden") {
      this.calendarHidden = "";
    }
    else {
      this.calendarHidden = "hidden";
    }
  }

  getManager() {
    this.http.get<IManager[]>('api/admin/Manager/').subscribe((data: IManager[]) => {
      this.managers = data.filter(d => d.typeManager == 2);
      this.cdr.detectChanges();
    });
  }

  getToDayAllCall(managerId, workgroupId) {
    return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.date == new Date().toLocaleDateString()  && c.managerId == managerId).length;  
  }

  getWeekAllCall(managerId, workgroupId) {
    let countWeekCall = 0;
    let curr = new Date();
    let first = (curr.getDate() - curr.getDay()) + 1;
    let last = first + 6;
    let firstday = new Date(curr.setDate(first));
    let lastday = new Date(curr.setDate(last));
    let clientAccept: ClientAccept[] = this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId);
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientAccept.filter(item => item.date.substring(0, item.date.indexOf(" ")) == i.toLocaleDateString()).length;
    }
    return countWeekCall;
  }

  getMonthAllCall(managerId, workgroupId) {
    let countMonthCall = 0;
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientAccept: ClientAccept[] = this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId);
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countMonthCall += clientAccept.filter(item => item.date.substring(0, item.date.indexOf(" ")) == i.toLocaleDateString()).length;
    }
    return countMonthCall;
  }

  getAllAllCall(managerId, workgroupId) {
    return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId).length;
  }

  //================================================================================================================

  getToDayMore2and5Call(managerId, workgroupId) {
    return this.statistickCallModel.find(s => s.workgroupId == workgroupId)
      .clientAccepts.filter(c => c.date == new Date().toLocaleDateString() && c.managerId == managerId && c.durations > 150).length;
  }

  getWeekMore2and5Call(managerId, workgroupId) {
    let countWeekCall = 0;
    let curr = new Date();
    let first = (curr.getDate() - curr.getDay()) + 1;
    let last = first + 6;
    let firstday = new Date(curr.setDate(first));
    let lastday = new Date(curr.setDate(last));
    let clientAccept: ClientAccept[] = this.statistickCallModel
      .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId && c.durations > 150);
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientAccept.filter(item => item.date.substring(0, item.date.indexOf(" ")) == i.toLocaleDateString()).length;
    }
    return countWeekCall;
  }

  getMonthMore2and5Call(managerId, workgroupId) {
    let countMonthCall = 0;
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientAccept: ClientAccept[] = this.statistickCallModel
      .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId && c.durations > 150);
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countMonthCall += clientAccept.filter(item => item.date.substring(0, item.date.indexOf(" ")) == i.toLocaleDateString()).length;
    }
    return countMonthCall;
  }

  getAllMore2and5Call(managerId, workgroupId) {
    return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId && c.durations > 150).length;
  }

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private cdr: ChangeDetectorRef) {
    this.getManager();
    this.getWorkGroup();
  }

  ngOnInit() {
  }

}
