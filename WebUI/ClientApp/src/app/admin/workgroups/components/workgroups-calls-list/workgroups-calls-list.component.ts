import { Component, OnInit, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { IWorkgroup } from '../../shared/models/workgroup.model';
import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';
import { IWorkgroupCalls } from '../../shared/models/workgroup-calls.model';
import { retry } from 'rxjs/operators';
import { concat } from 'rxjs';


@Component({
  selector: 'app-workgroups-calls-list',
  templateUrl: './workgroups-calls-list.component.html',
  styleUrls: ['./workgroups-calls-list.component.sass']
})
export class WorkgroupsCallsListComponent implements OnInit {
  
  @Input() workgroupsCalls: IWorkgroupCalls[];
  @Input() workgroups: IWorkgroup[];

  days: number[] = this.getDaysInMonth();

  dateCollections: string[] = [];
  dateCollection: string;
  fullworkgroupsCalls: IWorkgroupCalls[];
  numberMonthe: number = 0;
  numberYear: number = 0;

  getDaysInMonth(){
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const result = [];

    for(let i = 0; i < daysInMonth; i++){
      result.push(i + 1);
    }

    return result;
  }

  getClientContactType(day, clientActions = [], clientId) {
    const year = this.numberYear;
    const month = this.numberMonthe;

    const date = new Date(year, month, day).toLocaleDateString();
    let result: any[] = clientActions.filter(item => item.date == date);
    
    result = this.getUnique(result, 'managerType')

    if(!result.find(item => item.managerType == 10))
      result = [{ clientId: clientId, contactType: 0, date: date, id: 0, managerId: 0, managerType: 10 }, ...result]

    if(!result.find(item => item.managerType == 20))
      result = [...result, { clientId: clientId, contactType: 0, date: date, id: 0, managerId: 0, managerType: 20 },]
    

    return result
  }

  getSumActions(managerType, clientActions){
    return clientActions.filter(item => item.managerType == managerType).length;
  }

  getActionColor(contactType) {
    
    if(contactType == 0)
      return '#e5e5e5';
    else if (contactType == 10)
      return '#9CBFF3'
    else if (contactType == 20)
      return '#B0ECDD'
    else if (contactType == 30)
      return '#FDE488'
  }

  sortActionClient(day: number) {
    let workGruope = [];
    for (let i = 0; i < this.workgroupsCalls.length; i++) {
      if (this.workgroupsCalls[i].clientActions != null && this.workgroupsCalls[i].clientActions.length != 0) {
        for (let j = 0; j < this.workgroupsCalls[i].clientActions.length; j++) {
          let tmpDate = this.workgroupsCalls[i].clientActions[j].date.split(".");
          if (new Date(tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0]).getDate() == day
            && new Date(tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0]).getMonth() == this.numberMonthe
            && new Date(tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0]).getFullYear() == this.numberYear) {
            workGruope.unshift(this.workgroupsCalls[i]);
            break;
          }
          else if (j == this.workgroupsCalls[i].clientActions.length-1) {
            workGruope.push(this.workgroupsCalls[i]);
          }
        }
      }
      else {
        workGruope.push(this.workgroupsCalls[i]);
      }
    }
    this.workgroupsCalls = workGruope;
  }

  sortActionClientMonte(month: number, year: number) {
    let workGruope = [];
    for (let i = 0; i < this.workgroupsCalls.length; i++) {
      if (this.workgroupsCalls[i].clientActions != null && this.workgroupsCalls[i].clientActions.length != 0) {
        for (let j = 0; j < this.workgroupsCalls[i].clientActions.length; j++) {
          let tmpDate = this.workgroupsCalls[i].clientActions[j].date.split(".");
          if (new Date(tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0]).getMonth() == new Date().getMonth()
            && new Date(tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0]).getFullYear() == new Date().getFullYear()) {
            workGruope.unshift(this.workgroupsCalls[i]);
            break;
          }
          else if (j == this.workgroupsCalls[i].clientActions.length - 1) {
            workGruope.push(this.workgroupsCalls[i]);
          }
        }
      }
      else {
        workGruope.push(this.workgroupsCalls[i]);
      }
    }
    this.workgroupsCalls = workGruope;
  }

  sortActionClientToName() {
    this.workgroupsCalls.sort(function (a, b) {
      var nameA = a.clientTitle.toLowerCase(), nameB = b.clientTitle.toLowerCase()
      if (nameA < nameB) 
        return -1
    })
  }

  snitWorkGroupForClient() {
    for (let i = 0; i < this.fullworkgroupsCalls.length; i++) {
      let workgroup = this.workgroups.find(w => w.clientIds.find(c => c == this.fullworkgroupsCalls[i].clientId) != null)
      if (workgroup != null) {
        this.fullworkgroupsCalls[i].nameWorkGroup = workgroup.title;
      }
    }
  }

  getUnique(arr, comp) {

    const unique = arr
         .map(e => e[comp])
  
       // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
  
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);
  
     return unique;
  }

  initDateArchiv() {
    if (this.fullworkgroupsCalls.length != 0 && this.dateCollections.length == 0) {
      this.dateCollections = [];
      let firstDate = new Date();
      for (let i = 0; i < this.fullworkgroupsCalls.length; i++) {
        for (let j = 0; j < this.fullworkgroupsCalls[i].clientActions.length; j++) {
          let tmpDate = this.fullworkgroupsCalls[i].clientActions[j].date.split(".");
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

  sortClientForMonthAndYear(month: number, year: number) {
    this.workgroupsCalls = [];
    for (let i = 0; i < this.fullworkgroupsCalls.length; i++) {
      for (let j = 0; j < this.fullworkgroupsCalls[i].clientActions.length; j++) {
        let tmpDate = this.fullworkgroupsCalls[i].clientActions[j].date.split(".");
        if (new Date(tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0]).getMonth() == month
          && new Date(tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0]).getFullYear() == year) {
          this.workgroupsCalls.push(this.fullworkgroupsCalls[i]);
          break;
        }
      }
    }
    console.log(this.workgroupsCalls);
  }

  toFormatDate(dateSelect) {
    let partDate = dateSelect.split('.');
    let date = new Date(partDate[1] + "/" + partDate[0]);
    this.numberMonthe = date.getMonth();
    this.numberYear = date.getFullYear();
    this.sortClientForMonthAndYear(date.getMonth(), date.getFullYear());
  }

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.fullworkgroupsCalls == null || this.fullworkgroupsCalls.length == 0 || this.fullworkgroupsCalls.length == this.workgroupsCalls.length) {
      const toMonth = new Date().getMonth();
      const toYear = new Date().getFullYear();
      this.numberMonthe = toMonth;
      this.numberYear = toYear;
      let dayofMonth = new Date().getDate();
      this.fullworkgroupsCalls = this.workgroupsCalls;
      this.sortClientForMonthAndYear(toMonth, toYear)
      this.sortActionClient(dayofMonth);
      this.snitWorkGroupForClient();
      this.initDateArchiv();
    }
  }

}
