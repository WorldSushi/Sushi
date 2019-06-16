import { Component, OnInit } from '@angular/core';
import { ClientsFacade } from '../../../../store/manager-rm/clients/facades/clients.facade';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent implements OnInit {



  constructor(public clientsFacade: ClientsFacade) { }

  ngOnInit() {
    this.clientsFacade.loadClients(1);
  }

}
