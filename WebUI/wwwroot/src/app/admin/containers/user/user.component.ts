import { Component } from '@angular/core';
import { IAdminState } from '../../reducers/user/user.reducers';
import { Store, select } from '@ngrx/store';
import { GetAll } from '../../actions/user/user.actions';
import { selectUserList } from '../../selectors/user.selector';
import { IAppState } from 'src/app/reducers';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent {
    
  users$ = this.store.pipe(select(selectUserList))

  showUsers() {
    console.log(this.users$);
  }

  constructor(private store: Store<IAppState>) {
    this.store.dispatch(new GetAll());
    setInterval(() => console.log(this.users$), 2000);
  }
}
