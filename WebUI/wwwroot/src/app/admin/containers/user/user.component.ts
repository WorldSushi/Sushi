import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent {

  users = [];

  constructor(private userService: UserService) {
    this.userService.getAll().subscribe(res => console.log(res));
  }
}
