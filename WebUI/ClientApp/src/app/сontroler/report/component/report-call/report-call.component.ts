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

    todayLoad: boolean = false;
    toWeekLoad: boolean = false;
    toMontheLoad: boolean = false;
    hiddenloader = "hidden";

  getcallsDater() {
    this.http.get<ClientAccept[]>('api/conroler/ClientAccept/').subscribe(async (data: ClientAccept[]) => {
      this.clientAcceptFull = data;
        this.sortCall();
    });
  }

    getWorkGroup() {
        this.hiddenloader = "";
        this.http.get<IWorkgroup[]>('api/admin/WorkGroup').subscribe((data: IWorkgroup[]) => {
            this.workgroup = data;
            this.getcallsDater();
        });
    }

  sortCall() {
    this.statistickCallModel = [];
      this.http.get<any[]>('api/conroler/ClientAccept/StatistickCall').subscribe(async (data: any[]) => {
          this.statistickCallModel = data;
          this.todayLoad = true;
          this.toWeekLoad = true;
          this.toMontheLoad = true;
          window.setTimeout(() => {
              this.todayLoad = false;
              this.toWeekLoad = false;
              this.toMontheLoad = false;
          }, 700);
          this.cdr.detectChanges();
          this.initDateArchiv();
          this.hiddenloader = "hidden";
      });
    console.log(this.statistickCallModel);
  }

  changeManager(manager) {
     
  }

    weekChnege() {
        this.toWeekLoad = true;
        window.setTimeout(() => {
            this.toWeekLoad = false;
        }, 700);
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
      this.todayLoad = true;
      window.setTimeout(() => {
          this.todayLoad = false;
      }, 700);
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
      this.toMontheLoad = true;
      window.setTimeout(() => {
          this.toMontheLoad = false;
      }, 700);
  
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
        let toDayCall;
        var s = managerId + "," + workgroupId;
        if (this.todayLoad) {
            toDayCall = this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId).length;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "all", toDayCall.toString());
        }
        else {
            toDayCall = window.sessionStorage.getItem(managerId + "," + workgroupId+"all");
        }
        return toDayCall
    }

    getWeekAllCall(managerId, workgroupId) {
        let toWeekCall;
        var s = managerId + "," + workgroupId;
        if (this.toWeekLoad) {
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
            toWeekCall = countWeekCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getWeekAllCall", toWeekCall.toString());
        }
        else {
            toWeekCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getWeekAllCall");
        }
        return toWeekCall;
    }

    getMonthAllCall(managerId, workgroupId) {
        let toMontheCall;
        var s = managerId + "," + workgroupId;
        if (this.toMontheLoad) {
            let countMonthCall = 0;
            var curr = new Date();
            var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
            var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
            let clientAccept: ClientAccept[] = this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId);
            countMonthCall = clientAccept.filter(c => new Date(c.date.slice(0, c.date.indexOf(' ')).split('.')[2] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[1] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[0]).getMonth() == this.numberMonthe).length;
            toMontheCall = countMonthCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getMonthAllCall", toMontheCall.toString());
        }
        else {
            toMontheCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getMonthAllCall");
        }
        return toMontheCall;
    }

  getAllAllCall(managerId, workgroupId) {
    return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId).length;
  }

  //================================================================================================================

    getToDayMore2and5Call(managerId, workgroupId) {
        let toDayCall;
        if (this.todayLoad) {
            toDayCall = this.statistickCallModel.find(s => s.workgroupId == workgroupId)
                .clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.date.substring(0, c.date.indexOf(" ")) == new Date().toLocaleDateString() && c.managerId == managerId && c.durations > 150).length;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "More2and5Call", toDayCall.toString());
        }
        else {
            toDayCall = window.sessionStorage.getItem(managerId + "," + workgroupId +"More2and5Call");
        }
        return toDayCall
  }

    getWeekMore2and5Call(managerId, workgroupId) {
        let toWeekCall;
        var s = managerId + "," + workgroupId;
        if (this.toWeekLoad) {
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
            toWeekCall = countWeekCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getWeekMore2and5Call", toWeekCall.toString());
        }
        else {
            toWeekCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getWeekMore2and5Call");
        }
        return toWeekCall;
    }

    getMonthMore2and5Call(managerId, workgroupId) {
        let toMontheCall;
        var s = managerId + "," + workgroupId;
        if (this.toMontheLoad) {

            let countMonthCall = 0;
            var curr = new Date();
            var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
            var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
            let clientAccept: ClientAccept[] = this.statistickCallModel
                .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId && c.durations > 150);
            countMonthCall = clientAccept.filter(c => new Date(c.date.slice(0, c.contactType != 30 && c.contactType != 20
                && c.date.indexOf(' ')).split('.')[2] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[1] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[0]).getMonth() == this.numberMonthe).length;
            toMontheCall = countMonthCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getMonthMore2and5Call", toMontheCall.toString());
        }
        else {
            toMontheCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getMonthMore2and5Call");
        }
        return toMontheCall;
  }

  getAllMore2and5Call(managerId, workgroupId) {
      return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.durations > 150).length;
  }

  //================================================================================================================

    getToDaySmaller2and5AndMore10SCall(managerId, workgroupId) {
        let toDayCall;
        if (this.todayLoad) {
            toDayCall = this.statistickCallModel.find(s => s.workgroupId == workgroupId)
                .clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20
                    && c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId && (c.durations <= 150 && c.durations > 10)).length;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "Smaller2and5AndMore10SCall", toDayCall.toString());
        }
        else {
            toDayCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "Smaller2and5AndMore10SCall");
        }
        return toDayCall
  }

    getWeekSmaller2and5AndMore10SCall(managerId, workgroupId) {
        let toWeekCall;
        if (this.toWeekLoad) {
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
            toWeekCall = countWeekCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getWeekSmaller2and5AndMore10SCall", toWeekCall.toString());
        }
        else {
            toWeekCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getWeekSmaller2and5AndMore10SCall");
        }
        return toWeekCall;
  }

    getMonthSmaller2and5AndMore10SCall(managerId, workgroupId) {
        let toMontheCall;
        var s = managerId + "," + workgroupId;
        if (this.toMontheLoad) {
            let countMonthCall = 0;
            var curr = new Date();
            var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
            var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
            let clientAccept: ClientAccept[] = this.statistickCallModel
                .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId && (c.durations < 150 && c.durations > 10));
            countMonthCall = clientAccept.filter(c => c.contactType != 30 && c.contactType != 20
                && new Date(c.date.slice(0, c.date.indexOf(' ')).split('.')[2] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[1] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[0]).getMonth() == this.numberMonthe).length;
            toMontheCall = countMonthCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getMonthSmaller2and5AndMore10SCall", toMontheCall.toString());
        }
        else {
            toMontheCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getMonthSmaller2and5AndMore10SCall");
        }
        return toMontheCall;
    }

  getAllSmaller2and5AndMore10SCall(managerId, workgroupId) {
      return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && (c.durations < 150 && c.durations > 10)).length;
  }

  //================================================================================================================

    getToDaySmaller10SCall(managerId, workgroupId) {
        let toDayCall;
        if (this.todayLoad) {
            toDayCall = this.statistickCallModel.find(s => s.workgroupId == workgroupId)
                .clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId && c.durations < 10).length;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "Smaller10SCall", toDayCall.toString());
        }
        else {
            toDayCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "Smaller10SCall");
        }
        return toDayCall
  }

    getWeekSmaller10SCall(managerId, workgroupId) {
        let toWeekCall;
        if (this.toWeekLoad) {
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
            toWeekCall = countWeekCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getWeekSmaller10SCall", toWeekCall.toString());
        }
        else {
            toWeekCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getWeekSmaller10SCall");
        }
        return toWeekCall;
  }

    getMonthSmaller10SCall(managerId, workgroupId) {
        let toMontheCall;
        var s = managerId + "," + workgroupId;
        if (this.toMontheLoad) {
            let countMonthCall = 0;
            var curr = new Date();
            var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
            var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
            let clientAccept: ClientAccept[] = this.statistickCallModel
                .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.durations < 10);
            countMonthCall = clientAccept.filter(c => new Date(c.date.slice(0, c.date.indexOf(' ')).split('.')[2] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[1] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[0]).getMonth() == this.numberMonthe).length;
            toMontheCall = countMonthCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getMonthSmaller10SCall", toMontheCall.toString());
        }
        else {
            toMontheCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getMonthSmaller10SCall");
        }
        return toMontheCall;
  }

  getAllSmaller10SCall(managerId, workgroupId) {
      return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.durations < 10).length;
  }

  //================================================================================================================

    getToDayDevelopmentCall(managerId, workgroupId) {
        let toDayCall;
        if (this.todayLoad) {
            toDayCall = this.statistickCallModel.find(s => s.workgroupId == workgroupId)
                .clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20
                    && c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId && c.contactType == 40).length;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "DevelopmentCall", toDayCall.toString());
        }
        else {
            toDayCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "DevelopmentCall");
        }
        return toDayCall
  }

    getWeekDevelopmentCall(managerId, workgroupId) {
        let toWeekCall;
        if (this.toWeekLoad) {
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
            toWeekCall = countWeekCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getWeekDevelopmentCall", toWeekCall.toString());
        }
        else {
            toWeekCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getWeekDevelopmentCall");
        }
        return toWeekCall;
  }

    getMonthDevelopmentCall(managerId, workgroupId) {
        let toMontheCall;
        var s = managerId + "," + workgroupId;
        if (this.toMontheLoad) {
            let countMonthCall = 0;
            var curr = new Date();
            var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
            var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
            let clientAccept: ClientAccept[] = this.statistickCallModel
                .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.contactType == 40);
            countMonthCall = clientAccept.filter(c => new Date(c.date.slice(0, c.date.indexOf(' ')).split('.')[2] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[1] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[0]).getMonth() == this.numberMonthe).length;
            toMontheCall = countMonthCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getMonthDevelopmentCall", toMontheCall.toString());
        }
        else {
            toMontheCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getMonthDevelopmentCall");
        }
        return toMontheCall;
  }

  getAllDevelopmentCall(managerId, workgroupId) {
      return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.contactType == 40).length;
  }

  //================================================================================================================

    getToDayToColleaguesCall(managerId, workgroupId) {
        let toDayCall;
        if (this.todayLoad) {
            toDayCall = this.statistickCallModel.find(s => s.workgroupId == workgroupId)
                .clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20
                    && c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId && c.contactType == 50).length;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "ToColleaguesCall", toDayCall.toString());
        }
        else {
            toDayCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "ToColleaguesCall");
        }
        return toDayCall
  }

    getWeekToColleaguesCall(managerId, workgroupId) {
        let toWeekCall;
        if (this.toWeekLoad) {
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
            toWeekCall = countWeekCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getWeekToColleaguesCall", toWeekCall.toString());
        }
        else {
            toWeekCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getWeekToColleaguesCall");
        }
        return toWeekCall;
    }

    getMonthColleaguesCall(managerId, workgroupId) {
        let toMontheCall;
        var s = managerId + "," + workgroupId;
        if (this.toMontheLoad) {
            let countMonthCall = 0;
            var curr = new Date();
            var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
            var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
            let clientAccept: ClientAccept[] = this.statistickCallModel
                .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.contactType == 50);
            for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
                countMonthCall += clientAccept.filter(item => item.date.substring(0, item.date.indexOf(" ")) == i.toLocaleDateString()).length;
            }
            toMontheCall = countMonthCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getMonthColleaguesCall", toMontheCall.toString());
        }
        else {
            toMontheCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getMonthColleaguesCall");
        }
        return toMontheCall;
    }

  getAllToColleaguesCall(managerId, workgroupId) {
      return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.contactType == 50).length;
  }

  //================================================================================================================

    getToDayOutgoingCall(managerId, workgroupId) {
        let toDayCall;
        if (this.todayLoad) {
            toDayCall = this.statistickCallModel.find(s => s.workgroupId == workgroupId)
                .clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20
                    && c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId && c.direction == "Исходящий").length;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "ToColleaguesCall", toDayCall.toString());
        }
        else {
            toDayCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "ToColleaguesCall");
        }
        return toDayCall
  }

    getWeekOutgoingCall(managerId, workgroupId) {
        let toWeekCall;
        if (this.toWeekLoad) {
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
            toWeekCall = countWeekCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getWeekOutgoingCall", toWeekCall.toString());
        }
        else {
            toWeekCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getWeekOutgoingCall");
        }
        return toWeekCall;
  }

    getMonthOutgoingCall(managerId, workgroupId) {
        let toMontheCall;
        var s = managerId + "," + workgroupId;
        if (this.toMontheLoad) {
            let countMonthCall = 0;
            var curr = new Date();
            var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
            var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
            let clientAccept: ClientAccept[] = this.statistickCallModel
                .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.direction == "Исходящий");
            countMonthCall = clientAccept.filter(c => new Date(c.date.slice(0, c.date.indexOf(' ')).split('.')[2] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[1] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[0]).getMonth() == this.numberMonthe).length;
            toMontheCall = countMonthCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getMonthOutgoingCall", toMontheCall.toString());
        }
        else {
            toMontheCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getMonthOutgoingCall");
        }
        return toMontheCall;
    }

  getAllToOutgoingCall(managerId, workgroupId) {
      return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.direction == "Исходящий").length;
  }

  //================================================================================================================

    getToDayInboxCall(managerId, workgroupId) {
        let toDayCall;
        if (this.todayLoad) {
            toDayCall = this.statistickCallModel.find(s => s.workgroupId == workgroupId)
                .clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId && c.direction == "Входящий").length;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "ToColleaguesCall", toDayCall.toString());
        }
        else {
            toDayCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "ToColleaguesCall");
        }
        return toDayCall
  }

    getWeekInboxCall(managerId, workgroupId) {
        let toWeekCall;
        if (this.toWeekLoad) {
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
            toWeekCall = countWeekCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getWeekInboxCall", toWeekCall.toString());
        }
        else {
            toWeekCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getWeekInboxCall");
        }
        return toWeekCall;
  }

    getMonthInboxCall(managerId, workgroupId) {
        let toMontheCall;
        var s = managerId + "," + workgroupId;
        if (this.toMontheLoad) {
            let countMonthCall = 0;
            var curr = new Date();
            var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
            var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
            let clientAccept: ClientAccept[] = this.statistickCallModel
                .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.direction == "Входящий");
            countMonthCall = clientAccept.filter(c => new Date(c.date.slice(0, c.date.indexOf(' ')).split('.')[2] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[1] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[0]).getMonth() == this.numberMonthe).length;
            toMontheCall = countMonthCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getMonthInboxCall", toMontheCall.toString());
        }
        else {
            toMontheCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getMonthInboxCall");
        }
        return toMontheCall;
  }

  getAllInboxCall(managerId, workgroupId) {
      return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.direction == "Входящий").length;
  }

  //================================================================================================================

    getToDayUnansweredCall(managerId, workgroupId) {
        let toDayCall;
        if (this.todayLoad) {
            toDayCall = this.statistickCallModel.find(s => s.workgroupId == workgroupId)
                .clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId && c.durations == 0).length;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "ToColleaguesCall", toDayCall.toString());
        }
        else {
            toDayCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "ToColleaguesCall");
        }
        return toDayCall
  }

    getWeekUnansweredCall(managerId, workgroupId) {
        let toWeekCall;
        if (this.toWeekLoad) {
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
            toWeekCall = countWeekCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getWeekUnansweredCall", toWeekCall.toString());
        }
        else {
            toWeekCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getWeekUnansweredCall");
        }
        return toWeekCall;
  }

    getMonthUnansweredCall(managerId, workgroupId) {
        let toMontheCall;
        var s = managerId + "," + workgroupId;
        if (this.toMontheLoad) {
            let countMonthCall = 0;
            var curr = new Date();
            var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
            var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
            let clientAccept: ClientAccept[] = this.statistickCallModel
                .find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.contactType != 30 && c.contactType != 20 && c.managerId == managerId && c.durations == 0);
            countMonthCall = clientAccept.filter(c => new Date(c.date.slice(0, c.date.indexOf(' ')).split('.')[2] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[1] + "/" + c.date.slice(0, c.date.indexOf(' ')).split('.')[0]).getMonth() == this.numberMonthe).length;
            toMontheCall = countMonthCall;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getMonthUnansweredCall", toMontheCall.toString());
        }
        else {
            toMontheCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getMonthUnansweredCall");
        }
        return toMontheCall;
  }

  getAllUnansweredCall(managerId, workgroupId) {
    return this.statistickCallModel.find(s => s.workgroupId == workgroupId).clientAccepts.filter(c => c.managerId == managerId && c.durations == 0).length;
  }
  //================================================================================================================

    getToDayDurationsCall(managerId, workgroupId) {
        let toDayCall;
        if (this.todayLoad) {
            let durations = 0;
            let statistickCalls: any[] = this.statistickCallModel.find(s => s.workgroupId == workgroupId)
                .clientAccepts.filter(c => c.date.substring(0, c.date.indexOf(" ")) == new Date(this.btnDate).toLocaleDateString() && c.managerId == managerId);
            statistickCalls.forEach((itme) => {
                durations += itme.durations;
            })
            let date = new Date(null);
            date.setSeconds(durations);
            toDayCall = date.toISOString().substr(11, 8);
            window.sessionStorage.setItem(managerId + "," + workgroupId + "DayDurationsCall", toDayCall.toString());
        }
        else {
            toDayCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "DayDurationsCall");
        }
        return toDayCall
    }

    getWeekDurationsCall(managerId, workgroupId) {
        let toWeekCall;
        if (this.toWeekLoad) {
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
            toWeekCall = result;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getWeekDurationsCall", toWeekCall.toString());
        }
        else {
            toWeekCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getWeekDurationsCall");
        }
        return toWeekCall;
  }

    getMonthDurationsCall(managerId, workgroupId) {
        let toMontheCall;
        var s = managerId + "," + workgroupId;
        if (this.toMontheLoad) {

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
            toMontheCall = result;
            window.sessionStorage.setItem(managerId + "," + workgroupId + "getMonthDurationsCall", toMontheCall.toString());
        }
        else {
            toMontheCall = window.sessionStorage.getItem(managerId + "," + workgroupId + "getMonthDurationsCall");
        }
        return toMontheCall;
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

    constructor(private cdr: ChangeDetectorRef,
                public dialog: MatDialog,
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
