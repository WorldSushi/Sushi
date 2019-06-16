import { Component, OnInit } from '@angular/core';
import { ClientsFacade } from 'src/app/store/manager-rm/clients/facades/clients.facade';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent implements OnInit {

  clients$ = this.clientsFacade.clients$;

  constructor(public clientsFacade: ClientsFacade) { }

  ngOnInit() {
    this.clientsFacade.loadClients(1);
  }

}
