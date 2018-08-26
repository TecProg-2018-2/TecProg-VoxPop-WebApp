import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  constructor(
    private cookieService: CookieService,
    private token: TokenService,
  ) { }

  sidebar: string = '';
  tokenValue: string = '';

  ngOnInit() {
    this.sidebar = this.cookieService.get('sidebar');
    this.setSidebar(this.sidebar);
  }

  setSidebar(sidebarCookie: any) {
    if (sidebarCookie === 'false') {
      const sidebarStatus: HTMLElement = document.getElementById('sidebar');
      sidebarStatus.classList.toggle('active');
      const contentStatus = document.getElementById('content');
      contentStatus.classList.toggle('active');
    }
  }

  getStyle() {
    let styleStatus: string = '';
    if (this.token.getToken() === '') {
      styleStatus = 'disabled';
    }
    return styleStatus;
  }

  isLogged() {
    if (this.token.getToken() === '') {
      return false;
    }
    return true;
  }
}
