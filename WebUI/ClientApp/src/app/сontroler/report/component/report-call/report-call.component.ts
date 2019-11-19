import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ClientAccept } from '../../../../manager-rm/clients/shared/models/client-accep.modelt';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { IManager } from '../../../../admin/managers/shared/models/manager.model';
import { IWorkgroup } from '../../../../admin/workgroups/shared/models/workgroup.model';
import { async } from 'q';

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
  btnDate: string = new Date().toLocaleDateString();
  durationTxt: number = -1;
  manager: number = 0;
  statistickCallModel: any[] = [];
  numberYear: number = new Date().getFullYear();
  numberMonthe: number = new Date().getMonth();
  numberWeek: number = 1;
  dateCollections: string[] = [];
  dateCollection: string;


  getcallsDater() {
    this.http.get<ClientAccept[]>('api/conroler/ClientAccept/').subscribe(async (data: ClientAccept[]) => {
      this.clientAcceptFull = data;
      this.initDateArchiv();
      this.sortCall();
    });
  }

  getWorkGroup() {
    this.http.get<IWorkgroup[]>('api/admin/WorkGroup').subscribe((data: IWorkgroup[]) => {
      this.workgroup = data;
      this.getcallsDater();
    });
  }

  sortCall() {
    this.statistickCallModel = [];
    this.workgroup.forEach((item: IWorkgroup) => {
      let clientAccept = this.clientAcceptFull.filter(c => (c.managerId == item.escortManagerId || c.managerId == item.regionalManagerId) 
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

  verifyRange($event) {
    this.btnDate = $event.currentTarget.value;
  }

  hiddenCalendar() {
    if (this.calendarHidden == "hidden") {
      this.calendarHidden = "";
    }
    else {
      this.calendarHidden = "hidden";
    }
  }

  initDateArchiv() {
    if (this.dateCollections.length == 0) {
      this.dateCollections = [];
      let firstDate = new Date();
      for (let i = 0; i < this.clientAcceptFull.length; i++) {
        let tmpDate = this.clientAcceptFull[i].date.split(".");
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

  toFormatDate(dateSelect) {
    let partDate = dateSelect.split('.');
    let date = new Date(partDate[1] + "/" + partDate[0]);
    this.numberMonthe = date.getMonth();
    this.numberYear = date.getFullYear();
    //this.setSortWeeplan();
  }

  getManager() {
    this.http.get<IManager[]>('api/admin/Manager/').subscribe((data: IManager[]) => {
      this.managers = data.filter(d => d.typeManager == 2);
    });
  }

  getPeriudWeek() {
    let curr = new Date(this.numberYear, this.numberMonthe, 7 * this.numberWeek);
    let first = (curr.getDate() - curr.getDay()) + 1;
    let last = first + 6;
    let firstday = new Date(curr.setDate(first));
    let lastday = new Date(curr.setDate(last));
    return firstday.toLocaleDateString() + ' - ' + lastday.toLocaleDateString() 
  }


  getToDayAllCall(managerId, workgroupId) {
      return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId).length;  
  }

  getWeekAllCall(managerId, workgroupId) {
    let countWeekCall = 0;
    let curr = new Date(this.numberYear, this.numberMonthe, 7 * this.numberWeek);
    let first = (curr.getDate() - curr.getDay()) + 1;
    let last = first + 6;
    let firstday = new Date(curr.setDate(first));
    let lastday = new Date(curr.setDate(last));
      let clientAccept: ClientAccept[] = this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId);
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
      let clientAccept: ClientAccept[] = this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 &&c.managerId == managerId);
      countMonthCall = clientAccept.filter(c =>  new Date(c.date.slice(0, c.date.indexOf(' ')).split('.')[2] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[1] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[0]).getMonth() == this.numberMonthe).length;

    return countMonthCall;
  }

  getAllAllCall(managerId, workgroupId) {
    return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId).length;
  }

  //================================================================================================================

  getToDayMore2and5Call(managerId, workgroupId) {
    return this.statistickCallModel.find(s => s.workgroupId == workgroupId)
        .clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.date.substring(0, c.date.indexOf(" ")) == new Date().toLocaleDateString() && c.managerId == managerId && c.durations > 150).length;
  }

  getWeekMore2and5Call(managerId, workgroupId) {
    let countWeekCall = 0;
    let curr = new Date();
    let first = (curr.getDate() - curr.getDay()) + 1;
    let last = first + 6;
    let firstday = new Date(curr.setDate(first));
    let lastday = new Date(curr.setDate(last));
    let clientAccept: ClientAccept[] = this.statistickCallModel
        .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.durations > 150);
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
      countMonthCall = clientAccept.filter(c => new Date(c.date.slice(0, c.contactType != 30 && c.contactType != 20
          && c.date.indexOf(' ')).split('.')[2] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[1] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[0]).getMonth() == this.numberMonthe).length;
    return countMonthCall;
  }

  getAllMore2and5Call(managerId, workgroupId) {
      return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.durations > 150).length;
  }

  //================================================================================================================

  getToDaySmaller2and5AndMore10SCall(managerId, workgroupId) {
    return this.statistickCallModel.find(s => s.workgroupId == workgroupId)
        .clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20
            && c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId && (c.durations <= 150 && c.durations > 10)).length;
  }

  getWeekSmaller2and5AndMore10SCall(managerId, workgroupId) {
    let countWeekCall = 0;
    let curr = new Date(this.numberYear, this.numberMonthe, 7 * this.numberWeek);
    let first = (curr.getDate() - curr.getDay()) + 1;
    let last = first + 6;
    let firstday = new Date(curr.setDate(first));
    let lastday = new Date(curr.setDate(last));
    let clientAccept: ClientAccept[] = this.statistickCallModel
        .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && (c.durations < 150 && c.durations > 10));
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientAccept.filter(item => item.date.substring(0, item.date.indexOf(" ")) == i.toLocaleDateString()).length;
    }
    return countWeekCall;
  }

  getMonthSmaller2and5AndMore10SCall(managerId, workgroupId) {
    let countMonthCall = 0;
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientAccept: ClientAccept[] = this.statistickCallModel
      .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId && (c.durations < 150 && c.durations > 10));
      countMonthCall = clientAccept.filter(c => c.contactType != 30 && c.contactType != 20
          && new Date(c.date.slice(0, c.date.indexOf(' ')).split('.')[2] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[1] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[0]).getMonth() == this.numberMonthe).length;
    return countMonthCall;
  }

  getAllSmaller2and5AndMore10SCall(managerId, workgroupId) {
      return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && (c.durations < 150 && c.durations > 10)).length;
  }

  //================================================================================================================

  getToDaySmaller10SCall(managerId, workgroupId) {
    return this.statistickCallModel.find(s => s.workgroupId == workgroupId)
        .clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId &&  c.durations < 10).length;
  }

  getWeekSmaller10SCall(managerId, workgroupId) {
    let countWeekCall = 0;
    let curr = new Date();
    let first = (curr.getDate() - curr.getDay()) + 1;
    let last = first + 6;
    let firstday = new Date(curr.setDate(first));
    let lastday = new Date(curr.setDate(last));
    let clientAccept: ClientAccept[] = this.statistickCallModel
        .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.durations < 10);
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientAccept.filter(item => item.date.substring(0, item.date.indexOf(" ")) == i.toLocaleDateString()).length;
    }
    return countWeekCall;
  }

  getMonthSmaller10SCall(managerId, workgroupId) {
    let countMonthCall = 0;
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientAccept: ClientAccept[] = this.statistickCallModel
        .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.durations < 10);
      countMonthCall = clientAccept.filter(c =>  new Date(c.date.slice(0, c.date.indexOf(' ')).split('.')[2] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[1] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[0]).getMonth() == this.numberMonthe).length;
    return countMonthCall;
  }

  getAllSmaller10SCall(managerId, workgroupId) {
      return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.durations < 10).length;
  }

  //================================================================================================================

  getToDayDevelopmentCall(managerId, workgroupId) {
    return this.statistickCallModel.find(s => s.workgroupId == workgroupId)
        .clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20
            && c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId && c.contactType == 40).length;
  }

  getWeekDevelopmentCall(managerId, workgroupId) {
    let countWeekCall = 0;
    let curr = new Date(this.numberYear, this.numberMonthe, 7 * this.numberWeek);
    let first = (curr.getDate() - curr.getDay()) + 1;
    let last = first + 6;
    let firstday = new Date(curr.setDate(first));
    let lastday = new Date(curr.setDate(last));
    let clientAccept: ClientAccept[] = this.statistickCallModel
        .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.contactType == 40);
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientAccept.filter(item => item.date.substring(0, item.date.indexOf(" ")) == i.toLocaleDateString()).length;
    }
    return countWeekCall;
  }

  getMonthDevelopmentCall(managerId, workgroupId) {
    let countMonthCall = 0;
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientAccept: ClientAccept[] = this.statistickCallModel
        .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.contactType == 40);
      countMonthCall = clientAccept.filter(c => new Date(c.date.slice(0, c.date.indexOf(' ')).split('.')[2] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[1] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[0]).getMonth() == this.numberMonthe).length;
    //for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
    //  countMonthCall += clientAccept.filter(item => item.date.substring(0, item.date.indexOf(" ")) == i.toLocaleDateString()).length;
    //}
    return countMonthCall;
  }

  getAllDevelopmentCall(managerId, workgroupId) {
      return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.contactType == 40).length;
  }

  //================================================================================================================

  getToDayToColleaguesCall(managerId, workgroupId) {
    return this.statistickCallModel.find(s => s.workgroupId == workgroupId)
        .clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20
            && c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId && c.contactType == 50).length;
  }

  getWeekToColleaguesCall(managerId, workgroupId) {
    let countWeekCall = 0;
    let curr = new Date(this.numberYear, this.numberMonthe, 7 * this.numberWeek);
    let first = (curr.getDate() - curr.getDay()) + 1;
    let last = first + 6;
    let firstday = new Date(curr.setDate(first));
    let lastday = new Date(curr.setDate(last));
    let clientAccept: ClientAccept[] = this.statistickCallModel
        .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.contactType == 50);
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientAccept.filter(item => item.date.substring(0, item.date.indexOf(" ")) == i.toLocaleDateString()).length;
    }
    return countWeekCall;
  }

  getMonthColleaguesCall(managerId, workgroupId) {
    let countMonthCall = 0;
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientAccept: ClientAccept[] = this.statistickCallModel
        .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.contactType == 50);
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countMonthCall += clientAccept.filter(item => item.date.substring(0, item.date.indexOf(" ")) == i.toLocaleDateString()).length;
    }
    return countMonthCall;
  }

  getAllToColleaguesCall(managerId, workgroupId) {
      return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.contactType == 50).length;
  }

  //================================================================================================================

  getToDayOutgoingCall(managerId, workgroupId) {
    return this.statistickCallModel.find(s => s.workgroupId == workgroupId)
        .clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20
            && c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId && c.direction == "Исходящий").length;
  }

  getWeekOutgoingCall(managerId, workgroupId) {
    let countWeekCall = 0;
    let curr = new Date(this.numberYear, this.numberMonthe, 7 * this.numberWeek);
    let first = (curr.getDate() - curr.getDay()) + 1;
    let last = first + 6;
    let firstday = new Date(curr.setDate(first));
    let lastday = new Date(curr.setDate(last));
    let clientAccept: ClientAccept[] = this.statistickCallModel
        .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.direction == "Исходящий");
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientAccept.filter(item => item.date.substring(0, item.date.indexOf(" ")) == i.toLocaleDateString()).length;
    }
    return countWeekCall;
  }

  getMonthOutgoingCall(managerId, workgroupId) {
    let countMonthCall = 0;
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientAccept: ClientAccept[] = this.statistickCallModel
        .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.direction == "Исходящий");
    countMonthCall = clientAccept.filter(c => new Date(c.date.slice(0, c.date.indexOf(' ')).split('.')[2] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[1] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[0]).getMonth() == this.numberMonthe).length;
    return countMonthCall;
  }

  getAllToOutgoingCall(managerId, workgroupId) {
      return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.direction == "Исходящий").length;
  }

  //================================================================================================================

  getToDayInboxCall(managerId, workgroupId) {
    return this.statistickCallModel.find(s => s.workgroupId == workgroupId)
        .clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId && c.direction == "Входящий").length;
  }

  getWeekInboxCall(managerId, workgroupId) {
    let countWeekCall = 0;
    let curr = new Date(this.numberYear, this.numberMonthe, 7 * this.numberWeek);
    let first = (curr.getDate() - curr.getDay()) + 1;
    let last = first + 6;
    let firstday = new Date(curr.setDate(first));
    let lastday = new Date(curr.setDate(last));
    let clientAccept: ClientAccept[] = this.statistickCallModel
      .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId && c.direction == "Входящий");
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientAccept.filter(item => item.date.substring(0, item.date.indexOf(" ")) == i.toLocaleDateString()).length;
    }
    return countWeekCall;
  }

  getMonthInboxCall(managerId, workgroupId) {
    let countMonthCall = 0;
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientAccept: ClientAccept[] = this.statistickCallModel
        .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.direction == "Входящий");
    countMonthCall = clientAccept.filter(c => new Date(c.date.slice(0, c.date.indexOf(' ')).split('.')[2] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[1] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[0]).getMonth() == this.numberMonthe).length;
    return countMonthCall;
  }

  getAllInboxCall(managerId, workgroupId) {
      return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.direction == "Входящий").length;
  }

  //================================================================================================================

  getToDayUnansweredCall(managerId, workgroupId) {
    return this.statistickCallModel.find(s => s.workgroupId == workgroupId)
        .clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId && c.durations == 0).length;
  }

  getWeekUnansweredCall(managerId, workgroupId) {
    let countWeekCall = 0;
    let curr = new Date(this.numberYear, this.numberMonthe, 7 * this.numberWeek);
    let first = (curr.getDate() - curr.getDay()) + 1;
    let last = first + 6;
    let firstday = new Date(curr.setDate(first));
    let lastday = new Date(curr.setDate(last));
    let clientAccept: ClientAccept[] = this.statistickCallModel
        .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.durations == 0);
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientAccept.filter(item => item.date.substring(0, item.date.indexOf(" ")) == i.toLocaleDateString()).length;
    }
    return countWeekCall;
  }

  getMonthUnansweredCall(managerId, workgroupId) {
    let countMonthCall = 0;
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientAccept: ClientAccept[] = this.statistickCallModel
        .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.durations == 0);
    countMonthCall = clientAccept.filter(c => new Date(c.date.slice(0, c.date.indexOf(' ')).split('.')[2] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[1] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[0]).getMonth() == this.numberMonthe).length;
    return countMonthCall;
  }

  getAllUnansweredCall(managerId, workgroupId) {
    return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId && c.durations == 0).length;
  }
  //================================================================================================================

  getToDayDurationsCall(managerId, workgroupId) {
    let durations = 0;
    let statistickCalls: any[] = this.statistickCallModel.find(s => s.workgroupId == workgroupId)
      .clientAccepts.filter(c => c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId);
    statistickCalls.forEach((itme) => {
      durations += itme.durations;
    })
    let date = new Date(null);
    date.setSeconds(durations);
    var result = date.toISOString().substr(11, 8);
    return result;
  }

  getWeekDurationsCall(managerId, workgroupId) {
    let durations = 0;
    let curr = new Date(this.numberYear, this.numberMonthe, 7 * this.numberWeek);
    let first = (curr.getDate() - curr.getDay()) + 1;
    let last = first + 6;
    let firstday = new Date(curr.setDate(first));
    let lastday = new Date(curr.setDate(last));
    let clientAccept: ClientAccept[] = this.statistickCallModel
      .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId);
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      let statistickCalls: any[] = clientAccept.filter(item => item.date.substring(0, item.date.indexOf(" ")) == i.toLocaleDateString());
      statistickCalls.forEach((itme) => {
        durations += itme.durations;
      })
    }
    let date = new Date(null);
    date.setSeconds(durations);
    var result = date.toISOString().substr(11, 8);
    return result;
  }

  getMonthDurationsCall(managerId, workgroupId) {
    let durations = 0;
    var curr = new Date(this.numberYear, this.numberMonthe);
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientAccept: ClientAccept[] = this.statistickCallModel
      .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId);
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      let statistickCalls: any[] = clientAccept.filter(item => item.date.substring(0, item.date.indexOf(" ")) == i.toLocaleDateString());
      statistickCalls.forEach((itme) => {
        durations += itme.durations;
      })
    }
    let date = new Date(null);
    date.setSeconds(durations);
    var result = date.toISOString().substr(11, 8);
    return result;
  }

  getAllDurationsCall(managerId, workgroupId) {
    let durations = 0;
    let statistickCalls: any[] = this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId);
    statistickCalls.forEach((itme) => {
      durations += itme.durations;
    })
    let date = new Date(null);
    date.setSeconds(durations);
    var result = date.toISOString().substr(11, 8);
    return result;
  }

  getStartWorkManager(managerId, workgroupId) {
    let startWork = "------";
    let statistickCall: any[] = this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId
      && this.btnDate == (c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '-' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '-' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0])
      && (c.direction == "Исходящий" || (c.direction == "Входящий" && c.durations > 0)));
    if (statistickCall && statistickCall.length != 0) {
      let tmpData = new Date(statistickCall[0].date.substring(0, statistickCall[0].date.indexOf(" ")).split(".")[2] + '/' + statistickCall[0].date.substring(0, statistickCall[0].date.indexOf(" ")).split(".")[1] + '/' + statistickCall[0].date.substring(0, statistickCall[0].date.indexOf(" ")).split(".")[0] + " " + statistickCall[0].date.substring(statistickCall[0].date.indexOf(" ")));
      statistickCall.forEach((item) => {
        if (tmpData > new Date(item.date.substring(0, item.date.indexOf(" ")).split(".")[2] + '/' + item.date.substring(0, item.date.indexOf(" ")).split(".")[1] + '/' + item.date.substring(0, item.date.indexOf(" ")).split(".")[0] + " " + item.date.substring(statistickCall[0].date.indexOf(" ")))) {
          tmpData = new Date(item.date.substring(0, item.date.indexOf(" ")).split(".")[2] + '/' + item.date.substring(0, item.date.indexOf(" ")).split(".")[1] + '/' + item.date.substring(0, item.date.indexOf(" ")).split(".")[0] + " " + item.date.substring(statistickCall[0].date.indexOf(" ")));
        }
        startWork = tmpData.toLocaleString();
      });
    }
    return startWork;
  }

  getEndWorkManager(managerId, workgroupId) {
    let endWork = "------";
    if (this.durationTxt == -1) {
      let statistickCall: any[] = this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId
        && this.btnDate == (c.date.substring(0, c.date.indexOf(" ")).split(".")[2] + '-' + c.date.substring(0, c.date.indexOf(" ")).split(".")[1] + '-' + c.date.substring(0, c.date.indexOf(" ")).split(".")[0])
        && (c.direction == "Исходящий" || (c.direction == "Входящий" && c.durations > 0)));
      if (statistickCall && statistickCall.length != 0) {
        let tmpData = new Date(statistickCall[0].date.substring(0, statistickCall[0].date.indexOf(" ")).split(".")[2] + '/' + statistickCall[0].date.substring(0, statistickCall[0].date.indexOf(" ")).split(".")[1] + '/' + statistickCall[0].date.substring(0, statistickCall[0].date.indexOf(" ")).split(".")[0] + " " + statistickCall[0].date.substring(statistickCall[0].date.indexOf(" ")));
        statistickCall.forEach((item) => {
          if (tmpData < new Date(item.date.substring(0, item.date.indexOf(" ")).split(".")[2] + '/' + item.date.substring(0, item.date.indexOf(" ")).split(".")[1] + '/' + item.date.substring(0, item.date.indexOf(" ")).split(".")[0] + " " + item.date.substring(statistickCall[0].date.indexOf(" ")))) {
            tmpData = new Date(item.date.substring(0, item.date.indexOf(" ")).split(".")[2] + '/' + item.date.substring(0, item.date.indexOf(" ")).split(".")[1] + '/' + item.date.substring(0, item.date.indexOf(" ")).split(".")[0] + " " + item.date.substring(statistickCall[0].date.indexOf(" ")));
          }
          endWork = tmpData.toLocaleString();
        });
      }
    }
    return endWork;
  }

  constructor(public dialog: MatDialog,
    private http: HttpClient) {
    this.getManager();
    this.getWorkGroup();
  }

  ngOnInit() {
    this.btnDate = new Date().toLocaleDateString()
    let spl = this.btnDate.split('.');
    this.btnDate = spl[2] + "-" + spl[1] + "-" + spl[0];
  }

}
