import { Component, OnInit, Input } from '@angular/core';
import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';
import { IManager } from '../../../../admin/managers/shared/models/manager.model';
import { IUser } from '../../../../shared/models/user.model';

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
      .filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId).length;;
  }


  setToWeekCall(): number {
    var curr = new Date();
    var first = (curr.getDate() - curr.getDay()) + 1;
    var last = first + 6;
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId);
    let countWeekCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString()).length;;
    }
    return countWeekCall;
  }

  setToMonthkCall(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId);
    let countMonthCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countMonthCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString()).length;;
    }
    return countMonthCall;
  }

  setMoreTwoFiveCall(): number {
    return this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId)
      .filter(item => item.durations > 149).length;
  }

  setMoreTwoFiveCallMonth(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId);
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
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId);
    let countWeekCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && item.durations > 149).length;;
    }
    return countWeekCall;
  }

  setMoreTwoFiveCallDays(): number {
    return this.clientContacts.filter(item => item.date == new Date().toLocaleDateString())
      .filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId && item.durations > 149).length;
  }

  setMore10to2_5Call(): number {
    return this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId)
      .filter(item => item.durations < 149 && item.durations > 10).length;
  }

  setMore10to2_5CallMonth(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId);
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
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId);
    let countWeekCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && item.durations < 149 && item.durations > 10).length;;
    }
    return countWeekCall;
  }

  setMore10to2_5CallDays(): number {
    return this.clientContacts.filter(item => item.date == new Date().toLocaleDateString())
      .filter(item => item.managerId == (this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId) && (item.durations < 149 && item.durations > 10)).length;
  }

  setLes10SecCall(): number {
    return this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId)
      .filter(item => item.durations < 10).length;
  }

  setLes10SecCallMonth(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId);
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
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId);
    let countWeekCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && item.durations < 10).length;;
    }
    return countWeekCall;
  }

  setLes10SecCallDays(): number {
    return this.clientContacts.filter(item => item.date == new Date().toLocaleDateString())
      .filter(item => item.managerId == (this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId) && item.durations < 10).length;
  }

  setDevelopmentCall(): number {
    return this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId)
      .filter(item => item.contactType == 40 || item.contactType == 60).length;
  }

  setDevelopmentCallMonth(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId);
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
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId);
    let countWeekCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && (item.contactType == 40 || item.contactType == 60)).length;;
    }
    return countWeekCall;
  }

  setDevelopmentCallDays(): number {
    let s = this.clientContacts.filter(item => item.date == new Date().toLocaleDateString())
      .filter(item => item.managerId == (this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId) && (item.contactType == 40 || item.contactType == 60));
    console.log(s);
    return s.length;
  }


  setAceepControlerCall(): number {
    return this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId)
      .filter(item => item.contactType == 60).length;
  }

  setAceepControlerCallMonth(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId);
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
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId);
    let countWeekCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && item.contactType == 60).length;;
    }
    return countWeekCall;
  }

  setAceepControlerCallDays(): number {
    let s = this.clientContacts.filter(item => item.date == new Date().toLocaleDateString())
      .filter(item => item.managerId == (this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId) && item.contactType == 60);
    return s.length;
  }


  setManagerCall(): number {
    return this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId)
      .filter(item => item.contactType == 50).length;
  }

  setManagertCallMonth(): number {
    var curr = new Date();
    var firstday = new Date(curr.getFullYear(), curr.getMonth(), 1);
    var lastday = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId);
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
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId);
    let countWeekCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString() && item.contactType == 50).length;;
    }
    return countWeekCall;
  }

  setManagerCallDays(): number {
    let s = this.clientContacts.filter(item => item.date == new Date().toLocaleDateString())
      .filter(item => item.managerId == (this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId) && item.contactType == 50);
    console.log(s);
    return s.length;
  }

  setAllCall(): number {
    return this.clientContacts.length;
  }

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

}
