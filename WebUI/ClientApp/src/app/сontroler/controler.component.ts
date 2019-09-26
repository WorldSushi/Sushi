import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-controler',
  templateUrl: './controler.component.html',
  styleUrls: ['./controler.component.sass']
})
export class ControlerComponent implements OnInit {

  logout(){
    window.location.href = "/Account/Logout"
  }

  constructor() { }

  ngOnInit() {
  }

}
