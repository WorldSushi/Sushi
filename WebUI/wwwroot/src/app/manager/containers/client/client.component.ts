import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IManagerState } from '../../store/states';
import { selectClientList, selectClientsWithCallPlan } from '../../store/selectors/client.selectors';
import { GetAllClients } from '../../store/actions/client.action';
import { GetAllMonthyCallPlans } from '../../store/actions/montlyCallPlan.action';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {

  clients$ = this.store.pipe(select(selectClientsWithCallPlan))

  constructor(private store: Store<IManagerState>) { }

  ngOnInit() {
    this.store.dispatch(new GetAllClients());
    this.store.dispatch(new GetAllMonthyCallPlans());
  }

}
