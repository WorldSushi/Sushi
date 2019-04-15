import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAdminState } from '../../store/states';
import { selectClientList } from '../../store/selectors/client.selectors';
import { GetAll } from '../../store/actions/client.action';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {

  clients$ = this.store.pipe(select(selectClientList))

  constructor(private store: Store<IAdminState>) { }

  ngOnInit() {
    this.store.dispatch(new GetAll());
  }

}
