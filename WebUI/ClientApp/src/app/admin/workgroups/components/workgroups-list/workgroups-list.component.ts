import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWorkgroup } from '../../shared/models/workgroup.model';
import { MatDialog } from '@angular/material';
import { DetailWorkgroupDialogComponent } from '../../dialogs/detail-workgroup-dialog/detail-workgroup-dialog.component';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';
import { CreateWorkgroupDialogComponent } from '../../dialogs/create-workgroup-dialog/create-workgroup-dialog.component';
import { IManager } from 'src/app/admin/managers/shared/models/manager.model';
import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-workgroups-list',
  templateUrl: './workgroups-list.component.html',
  styleUrls: ['./workgroups-list.component.sass']
})
export class WorkgroupsListComponent implements OnInit {

  @Input() workgroups: IWorkgroup[];
  @Input() freeClients: IClient[];
  @Input() clientContacts: ICallsDate[];

  @Input() freeManagers: IManager[];

  @Output() clientAddedToWorkgroup = new EventEmitter();
  @Output() workgroupCreated = new EventEmitter();
  @Output() workgroupChanged = new EventEmitter();

  contactsStandard = 160;
  fullClientContacts: ICallsDate[];
  dateCollections: string[] = [];
  numberMonthe: number = 0;
  numberYear: number = 0;

  openWorkgroupDetail(workgroup: IWorkgroup) {
    console.log(this.freeManagers);
    const dialogRef = this.dialog.open(DetailWorkgroupDialogComponent, {
      width: '90%',
      height: '95%',
      data: {
        workgroup: workgroup,
        freeClients: this.freeClients.sort((a, b) => {
          if(a.title < b.title) { return -1; }
          if(a.title > b.title) { return 1; }
          return 0;
        }),
        freeManagers: this.freeManagers
      }
    })

    const sub1 = dialogRef.componentInstance.clientAdded.subscribe((data: any) => {
      
      this.clientAddedToWorkgroup.emit(data);
    });

    const sub2 = dialogRef.componentInstance.workgroupChanged.subscribe((data: any) => {
       
      this.workgroupChanged.emit(data);
    });
  }

  openWorkgroupCreate(){
    const dialogRef = this.dialog.open(CreateWorkgroupDialogComponent, {
      width: '725px',
      data: this.freeManagers
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.workgroupCreated.emit(res);
      }
    })
  }

  getAmountContactsToday(managerId: number){
    const today = new Date().toLocaleDateString();
    
    return this.clientContacts.filter(item => item.date == today && item.managerId == managerId).length;
  }

  getAmountContactsToWeek(managerId: number) {
    var curr = new Date();
    var first = (curr.getDate() - curr.getDay()) + 1;
    var last = first + 6;
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == managerId);
    let countWeekCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString()).length;;
    }
    return countWeekCall;
  }

  getAmountContactsToMonth(managerId: number) {
    var curr = new Date();
    var firstday = new Date(this.numberYear, this.numberMonthe, 1);
    var lastday = new Date(this.numberYear, this.numberMonthe + 1, 0);
    let clientContactsSort = this.clientContacts.filter(item => item.managerId == managerId);
    let countWeekCall = 0;
    for (let i = firstday; i <= lastday; i.setDate(i.getDate() + 1)) {
      countWeekCall += clientContactsSort.filter(item => item.date == i.toLocaleDateString()).length;;
    }
    return countWeekCall;
  }

  getCallContactsByManager(managerId) {
    return this.clientContacts.filter(item => item.managerId == managerId && item.contactType == 10).length;
  }

  sortClientForMonthAndYear(month: number, year: number) {
    this.clientContacts = [];
    for (let i = 0; i < this.fullClientContacts.length; i++) {
      let tmpDate = this.fullClientContacts[i].date.split(".");
      if (new Date(tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0]).getMonth() == month
        && new Date(tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0]).getFullYear() == year) {
        this.clientContacts.push(this.fullClientContacts[i]);
      }
    }
  }

  toFormatDate(dateSelect) {
    let partDate = dateSelect.split('.');
    let date = new Date(partDate[1] + "/" + partDate[0]);
    this.numberMonthe = date.getMonth();
    this.numberYear = date.getFullYear();
    this.sortClientForMonthAndYear(date.getMonth(), date.getFullYear());
  }

  initDateArchiv() {
    if (this.fullClientContacts.length != 0 && this.dateCollections.length == 0) {
      this.dateCollections = [];
      let firstDate = new Date();
      for (let i = 0; i < this.fullClientContacts.length; i++) {
        let tmpDate = this.fullClientContacts[i].date.split(".");
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
    }
  }

  ngOnChanges(changes): void {
    if (this.fullClientContacts == null || this.fullClientContacts.length == 0 || this.fullClientContacts.length == this.clientContacts.length) {
      const toMonth = new Date().getMonth();
      const toYear = new Date().getFullYear();
      this.numberMonthe = toMonth;
      this.numberYear = toYear;
      this.fullClientContacts = this.clientContacts;
      this.sortClientForMonthAndYear(toMonth, toYear)
      this.initDateArchiv();
    }
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}
