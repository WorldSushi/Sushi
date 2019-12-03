import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-controler',
  templateUrl: './controler.component.html',
  styleUrls: ['./controler.component.sass']
})
export class ControlerComponent implements OnInit {

  manager: any;

  logout(){
    window.location.href = "/Account/Logout"
  }

  getManager() {
    this.http.get('api/Account/Name').subscribe((data: any) => {
      this.manager = data;
      this.cdr.detectChanges();
    });
  }

  constructor(private http: HttpClient,
    private cdr: ChangeDetectorRef) {
    this.getManager();
  }

  ngOnInit() {

  }
  
  private _opened: boolean = false;

  private _toggleSidebar() {
      this._opened = !this._opened;
  }

  private _isMobile() {
      return window.innerWidth < 820;
  }

  private _getMenuIcon() {
      return this._opened ? '../../Icon/close.png' : '../../Icon/burger.png';
  }
}
