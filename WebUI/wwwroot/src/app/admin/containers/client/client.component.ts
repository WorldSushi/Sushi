import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAdminState } from '../../store/states';
import { selectClientList, selectLoadingStatus } from '../../store/selectors/client.selectors';
import { GetAll } from '../../store/actions/client.action';
import { selectManagerList } from '../../store/selectors/manager.selectors';
import { GetAllManagers } from '../../store/actions/user.action';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {

  clients$ = this.store.pipe(select(selectClientList));
  managers$ = this.store.pipe(select(selectManagerList));
  loading$ = this.store.pipe(select(selectLoadingStatus));

  constructor(private store: Store<IAdminState>) { }

  ngOnInit() {
    this.store.dispatch(new GetAll());
    this.store.dispatch(new GetAllManagers())
  }

}
