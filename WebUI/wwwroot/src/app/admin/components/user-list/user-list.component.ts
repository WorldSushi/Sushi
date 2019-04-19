import { Component, OnInit, Input } from '@angular/core';
import { Manager } from '../../models/manager.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {

  @Input()
  managers: Manager[];

  displayedColumns: string[] = ["id", "login", "password", "phone"];

  constructor() { }

  ngOnInit() {
  }

}
