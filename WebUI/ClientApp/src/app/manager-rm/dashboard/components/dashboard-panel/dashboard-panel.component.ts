import { Component, OnInit, Input } from '@angular/core';
import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';
import { IManager } from '../../../../admin/managers/shared/models/manager.model';
import { IUser } from '../../../../shared/models/user.model';
import { IPerformanceChart } from '../../../../admin/workgroups/shared/models/performance-chart.model';
import { HttpClient } from '@angular/common/http';
import { debug } from 'util';

@Component({
  selector: 'app-dashboard-panel',
  templateUrl: './dashboard-panel.component.html',
  styleUrls: ['./dashboard-panel.component.sass']
})
export class DashboardPanelComponent implements OnInit {

  @Input() clientContactsAmount: number = 0;
  @Input() clientContacts: ICallsDate[];
  @Input() Managerid: IUser;

  clientContactsToDayAmount: number = 0;

  countStandard = 20;
  hoursStandard = 8;
  balsOneStandard = 0.4;
  programStandard = 140;
  contactsStandard = this.countStandard * this.hoursStandard;
  balStandard = this.contactsStandard * this.balsOneStandard


  @Input() performanceChartMC: IPerformanceChart;
  @Input() performanceChartRM: IPerformanceChart;

  oneTasksEC = 0;
  tasksEC = 0;
  oneBallsEC = 0;
  ballsEC = 0;
  discrepancyEC = 0;
  fullPrecentEC = 0;

  oneTasksRM = 0;
  oneTasksRM1 = 0;
  tasksRM = 0;
  oneBallsRM = 0;
  ballsRM = 0;
  discrepancyRM = 0;
  fullPrecentRM = 0;

    setFormatEC() {
        debugger
        if (!this.performanceChartMC.numberPlan_DevelopmentCalls) {
            this.performanceChartMC.numberPlan_DevelopmentCalls = 0;
        }
        this.oneTasksEC = this.performanceChartMC.numberPlan_DevelopmentCalls * this.performanceChartMC.shiftPlan_DevelopmentCalls;
        this.oneBallsEC = this.performanceChartMC.balls_DevelopmentCalls * this.oneTasksEC;
        let msgCount = this.getToMonthkMesageEC();
        if (msgCount != 0) {
            let precent = 0;
            if (this.getToMonthkECManager() > 0) {
                precent = (msgCount / this.getToMonthkECManager()) * 100;
            }
            let precent10 = this.getToMonthkECManager() / 0.10;
            if (precent <= precent10) {
                this.tasksEC = this.getToMonthkECManager();
            }
            else {
                this.tasksEC = precent;
            }
        }
        else {
            this.tasksEC = this.getToMonthkECManager();
        }
        this.ballsEC = this.tasksEC * this.performanceChartMC.balls_DevelopmentCalls;
        if (this.ballsEC != 0) {
            this.fullPrecentEC = this.ballsEC / this.oneBallsEC;
        }
        else {
            this.fullPrecentEC = 0;
        }
    }


    setFormatRM() {
        if (!this.performanceChartRM.numberPlan_DevelopmentCalls) {
            this.performanceChartRM.numberPlan_DevelopmentCalls = 0;
        }
        this.oneTasksRM = this.performanceChartRM.numberPlan_YourShifts * this.performanceChartRM.shiftPlan_YourShifts;
        this.oneTasksRM1 = this.performanceChartRM.numberPlan_SubstitutionShifts * this.performanceChartRM.shiftPlan_SubstitutionShifts;
        this.ballsRM = this.performanceChartRM.numberPlan_DevelopmentCalls * this.performanceChartRM.balls_DevelopmentCalls + this.performanceChartRM.balls_YourShifts * (this.oneTasksRM + this.oneTasksRM1);
        let msgCount = this.getToMonthkMesageReg();
        if (msgCount != 0) {
            let precent = 0;
            if (this.getToMonthkRegManager() > 0) {
                precent = (msgCount / this.getToMonthkRegManager()) * 100;
            }
            let precent10 = this.getToMonthkRegManager() / 0.10;
            if (precent <= precent10) {
                this.tasksRM = this.getToMonthkRegManager();
            }
            else {
                this.tasksRM = precent;
            }
        }
        else {
            this.tasksRM = this.getToMonthkRegManager();
        }
        this.oneBallsRM = (this.performanceChartRM.numberPlan_DevelopmentCalls * this.performanceChartRM.balls_DevelopmentCalls) + (this.oneTasksRM1 * this.performanceChartRM.balls_YourShifts);
        if (this.ballsRM != 0) {
            this.fullPrecentRM = this.ballsRM / this.oneBallsRM;
        }
        else {
            this.fullPrecentRM = 0;
        }
    }

  getPerformanceChartMC() {
    this.http.get<IPerformanceChart>('api/admin/PerformanceChart?managerId=' + this.Managerid.workgroup.escortManagerId).subscribe((data: IPerformanceChart) => {
      this.performanceChartMC = data;
      this.setFormatEC();
      console.log(this.performanceChartMC);
    });
  }

  getPerformanceChartRM() {
    this.http.get<IPerformanceChart>('api/admin/PerformanceChart?managerId=' + this.Managerid.workgroup.regionalManagerId).subscribe((data: IPerformanceChart) => {
      this.performanceChartRM = data;
      this.setFormatRM();
      console.log(this.performanceChartRM);
    });
  }

  getToMonthkECManager(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
      var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
      let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId && item.contactType == 40);
    let countMonthCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countMonthCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString()).length;;
    }
    return countMonthCall;
  }

  getToMonthkRegManager(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.regionalManagerId && item.contactType == 40);
    let countMonthCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countMonthCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString()).length;;
    }
    return countMonthCall;
  }

  getToMonthkMesageEC(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId && (item.contactType == 20 || item.contactType == 30));
    let countMonthCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countMonthCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString()).length;;
    }
    return countMonthCall;
  }

  getToMonthkMesageReg(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.regionalManagerId && ( item.contactType == 20 || item.contactType == 30));
    let countMonthCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countMonthCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString()).length;;
    }
    return countMonthCall;
  }

  getEscortManagerBals() {
    return this.balsOneStandard * this.contactsStandard;
  }

  getEscortManagerCallContactsAmount() {
    let s = this.setDevelopmentCallMonth();
    return this.programStandard - this.setDevelopmentCallMonth();
  }

  getRegionalManagerCallContactsAmount(){
    return this.clientContacts.filter(item => item.contactType == 40 && item.managerType == 20).length
  }

  setToDayCall(): number {
    return this.clientContacts.filter(item => item.date == new Date().toLocaleDateString())
          .filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId)).length +
        this.clientContacts.filter(item => item.date == new Date().toLocaleDateString())
        .filter(item => item.contactType == 50 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId)).length;
  }


  setToWeekCall(): number {
    var curr = new Date();
    var first = (curr.getDate() - curr.getDay()) + 1;
    var last = first + 6;
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    let clientContactsSort = this.clientContacts.filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId));
    let clientContactsSort1 = this.clientContacts.filter(item => item.contactType == 50 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId));
    let countWeekCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
        countWeekCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString()).length
            + clientContactsSort1.filter(item => item.date == i.toLocaleDateString()).length;
    }
    return countWeekCall;
  }

  setToMonthkCall(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
      let clientContactsSort = this.clientContacts.filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId));
      let clientContactsSort1 = this.clientContacts.filter(item => item.contactType == 50 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId));
    let countMonthCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
        countMonthCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString()).length
            + clientContactsSort1.filter(item => item.date == i.toLocaleDateString()).length;
    }
    return countMonthCall;
  }

  setMoreTwoFiveCall(): number {
    return this.clientContacts.filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId))
      .filter(item => item.durations > 149).length;
  }

  setMoreTwoFiveCallMonth(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientContactsSort = this.clientContacts.filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId));
    let countMonthCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countMonthCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && item.durations > 149).length;;
    }
    return countMonthCall;
  }

  setMoreTwoFiveCallWeek(): number {
    var curr = new Date();
    var first = (curr.getDate() - curr.getDay()) + 1;
    var last = first + 6;
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    let clientContactsSort = this.clientContacts.filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId));
    let countWeekCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && item.durations > 149).length;;
    }
    return countWeekCall;
  }

  setMoreTwoFiveCallDays(): number {
    return this.clientContacts.filter(item => item.date == new Date().toLocaleDateString())
      .filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId) && item.durations >= 150).length;
  }

  setMore10to2_5Call(): number {
    return this.clientContacts.filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId))
      .filter(item => item.durations < 149 && item.durations > 10).length;
  }

  setMore10to2_5CallMonth(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientContactsSort = this.clientContacts.filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId));
    let countMonthCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countMonthCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && item.durations < 149 && item.durations > 10).length;;
    }
    return countMonthCall;
  }

  setMore10to2_5CallWeek(): number {
    var curr = new Date();
    var first = (curr.getDate() - curr.getDay()) + 1;
    var last = first + 6;
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    let clientContactsSort = this.clientContacts.filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId));
    let countWeekCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && item.durations < 149 && item.durations > 10).length;;
    }
    return countWeekCall;
  }

  setMore10to2_5CallDays(): number {
    return this.clientContacts.filter(item => item.date == new Date().toLocaleDateString())
      .filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId) && (item.durations < 149 && item.durations > 10)).length;
  }

  setLes10SecCall(): number {
    return this.clientContacts.filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId))
      .filter(item => item.durations < 10).length;
  }

  setLes10SecCallMonth(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientContactsSort = this.clientContacts.filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId));
    let countMonthCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countMonthCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && item.durations < 10).length;;
    }
    return countMonthCall;
  }

  setLes10SecCallWeek(): number {
    var curr = new Date();
    var first = (curr.getDate() - curr.getDay()) + 1;
    var last = first + 6;
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    let clientContactsSort = this.clientContacts.filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId));
    let countWeekCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && item.durations < 10).length;;
    }
    return countWeekCall;
  }

  setLes10SecCallDays(): number {
    return this.clientContacts.filter(item => item.date == new Date().toLocaleDateString())
      .filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId) && item.durations < 10).length;
  }

  setDevelopmentCall(): number {
    return this.clientContacts.filter(item => item.contactType != 30 && item.contactType != 20 && (item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId)))
      .filter(item => item.contactType == 40 || item.contactType == 60).length;
  }

  setDevelopmentCallMonth(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientContactsSort = this.clientContacts.filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId));
    let countMonthCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countMonthCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && (item.contactType == 40 || item.contactType == 60)).length;;
    }
    return countMonthCall;
  }

  setDevelopmentCallWeek(): number {
    var curr = new Date();
    var first = (curr.getDate() - curr.getDay()) + 1;
    var last = first + 6;
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    let clientContactsSort = this.clientContacts.filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId));
    let countWeekCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && (item.contactType == 40 || item.contactType == 60)).length;;
    }
    return countWeekCall;
  }

  setDevelopmentCallDays(): number {
    let s = this.clientContacts.filter(item => item.date == new Date().toLocaleDateString())
      .filter(item => (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId) && item.contactType == 40);
    return s.length;
  }


  setAceepControlerCall(): number {
    return this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId).length;
  }

  setAceepControlerCallMonth(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientContactsSort = this.clientContacts.filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId));
    let countMonthCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countMonthCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && item.contactType == 60).length;;
    }
    return countMonthCall;
  }

  setAceepControlerCallWeek(): number {
    var curr = new Date();
    var first = (curr.getDate() - curr.getDay()) + 1;
    var last = first + 6;
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    let clientContactsSort = this.clientContacts.filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId));
    let countWeekCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && item.contactType == 60).length;;
    }
    return countWeekCall;
  }

  setAceepControlerCallDays(): number {
    let s = this.clientContacts.filter(item => item.date == new Date().toLocaleDateString())
      .filter(item => item.contactType != 30 && item.contactType != 20 && (item.managerId == (this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId) && item.contactType == 60));
    return s.length;
  }


  setManagerCall(): number {
    return this.clientContacts.filter(item => (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId))
      .filter(item => item.contactType == 50).length;
  }

  setManagertCallMonth(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientContactsSort = this.clientContacts.filter(item => (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId));
    let countMonthCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countMonthCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && item.contactType == 50).length;;
    }
    return countMonthCall;
  }

  setmanagerCallWeek(): number {
    var curr = new Date();
    var first = (curr.getDate() - curr.getDay()) + 1;
    var last = first + 6;
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    let clientContactsSort = this.clientContacts.filter(item => (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId));
    let countWeekCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && item.contactType == 50).length;;
    }
    return countWeekCall;
  }

  setManagerCallDays(): number {
    let s = this.clientContacts.filter(item => item.date == new Date().toLocaleDateString())
      .filter(item => (item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId) && item.contactType == 50);
    return s.length;
  }

    setAllCall(): number {
        return this.clientContacts.length + this.clientContacts.filter(c => c.contactType == 50).length;
  }

  constructor(private http: HttpClient) {
   
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.Managerid) {
      if (this.Managerid.id == this.Managerid.workgroup.escortManagerId) {
        this.getPerformanceChartMC();
      }
      else if (this.Managerid.id == this.Managerid.workgroup.regionalManagerId) {
        this.getPerformanceChartRM();
      }
    }
  }

}
