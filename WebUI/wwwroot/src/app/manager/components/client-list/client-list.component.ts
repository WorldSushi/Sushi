import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../models/client.model';
import { ClientWithCallPlan } from '../../models/clientWithCallPlan.model';

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
    "amountCalls"
  ];

  yo(){
    console.log(this.clients);
  }

  constructor() { }

  ngOnInit() {
  }

}
