import { Component, OnInit, Input } from '@angular/core';
import { ClientWithCallPlan } from '../../models/clientWithCallPlan.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.sass']
})
export class ClientListComponent implements OnInit {

  @Input()
  clients: ClientWithCallPlan[]

  displayedColumns: string[] = [
    "id",
    "title", 
    "phone", 
    "plannedAmountCalls"
  ];

  callPlanningDisplayed: boolean = false;
  selectedClient = {};

  callPlanningForm = new FormGroup({
    amountColls: new FormControl(0)
  });

  constructor() { }

  ngOnInit() {
  }

  callPlanningOpen(clientId: number, clientTitle: string) {
    this.selectedClient = {
      id: clientId,
      title: clientTitle
    }
    
    this.callPlanningDisplayed = true;
  }

  callPlanningClose() {
    this.callPlanningDisplayed = false;
  }

  callPlanningFormSubmit() {
    
  }
}
