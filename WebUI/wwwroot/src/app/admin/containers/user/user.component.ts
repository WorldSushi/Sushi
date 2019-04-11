import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetAll } from '../../store/actions/user.action';
import { selectManagerList } from '../../store/selectors/manager.selectors';
import { IAdminState } from '../../store/states';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  managers$ = this.store.pipe(select(selectManagerList))

  constructor(private store: Store<IAdminState>) { }

  ngOnInit() {
    this.store.dispatch(new GetAll());
  }

}
