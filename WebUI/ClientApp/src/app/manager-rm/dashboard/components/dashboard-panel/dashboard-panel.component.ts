import { Component, OnInit, Input } from '@angular/core';
import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';

@Component({
  selector: 'app-dashboard-panel',
  templateUrl: './dashboard-panel.component.html',
  styleUrls: ['./dashboard-panel.component.sass']
})
export class DashboardPanelComponent implements OnInit {

  @Input() clientContactsAmount: number = 0;
  @Input() clientContacts: ICallsDate[];

  contactsStandard = 160;

  getEscortManagerCallContactsAmount(){
    return this.clientContacts.filter(item => item.contactType == 10 && item.managerType == 10).length
  }

  getRegionalManagerCallContactsAmount(){
    return this.clientContacts.filter(item => item.contactType == 10 && item.managerType == 20).length
  }

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.clientContacts);
  }

}
