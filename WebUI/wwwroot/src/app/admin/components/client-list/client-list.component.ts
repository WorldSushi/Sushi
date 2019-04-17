import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.sass']
})
export class ClientListComponent implements OnInit {

  @Input()
  clients: Client[];

  displayedColumns: string[] = [
    "id", 
    "title", 
    "phone",
    "plannedAmountCalls"
  ];

  constructor() { }

  ngOnInit() {
  }

}
