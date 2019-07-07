import { Component } from '@angular/core';
import { UserFacade } from './store/app/facades/user.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'SushiWorldApp';

  constructor(public userFacade: UserFacade){
    this.userFacade.loadCurrentUser();
  };
}
