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

  contactsStandard = 160;

  getEscortManagerCallContactsAmount(){
    return this.clientContacts.filter(item => item.contactType == 10 && item.managerType == 10).length
  }

  getRegionalManagerCallContactsAmount(){
    return this.clientContacts.filter(item => item.contactType == 10 && item.managerType == 20).length
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
    let countWeekCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString()).length;;
    }
    return countWeekCall;
  }

  setMoreTwoFiveCall(): number {
    return this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId)
      .filter(item => item.durations > 149).length;
  }

  setMore10to2_5Call(): number {
    return this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId)
      .filter(item => item.durations < 149 && item.durations > 10).length;
  }

  setLes10SecCall(): number {
    return this.clientContacts.filter(item => item.managerId == this.Managerid.workgroup.escortManagerId || item.managerId == this.Managerid.workgroup.regionalManagerId)
      .filter(item => item.durations < 10).length;
  }

  setAllCall(): number {
    return this.clientContacts.length;
  }

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.Managerid);
    console.log(this.clientContacts);
  }

}
