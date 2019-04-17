import { Component, OnInit, Input } from '@angular/core';
import { ClientWithCallPlan } from '../../models/clientWithCallPlan.model';
import { FormGroup, FormControl } from '@angular/forms';
import { MonthlyCallPlanService } from '../../services/monthlyCallPlan.service';

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
  selectedClient = {
    id: 0,
    title: ""
  };

  callPlanningForm = new FormGroup({
    amountCalls: new FormControl(0)
  });

  constructor(private monthlyCallPlanService: MonthlyCallPlanService) { }

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
    this.monthlyCallPlanService.createMonthlyCallPlan({
      clientId: this.selectedClient.id,
      amountCalls: this.callPlanningForm.controls["amountCalls"].value,
      month: 1
    }).subscribe(res => this.clients
      .find(item => item.id == res.clientId).plannedAmountCalls = res.amountCalls);

    this.callPlanningClose();
  }
}
