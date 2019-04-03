import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IManagerState } from '../../store/states/manager.state';
import { GetAll } from '../../store/actions/user.action';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  constructor(private store: Store<IManagerState>) { }

  ngOnInit() {
    this.store.dispatch(new GetAll());
  }

}
