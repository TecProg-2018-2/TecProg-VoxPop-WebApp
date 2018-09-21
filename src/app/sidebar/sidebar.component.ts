import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';

/* Component classes and its metadata. */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebar: string = '';
  tokenValue: string = '';

  constructor(
    private cookieService: CookieService,
    private token: TokenService,
  ) { }

  /* In the beggining, get the sidebar. */
  ngOnInit() {
    this.sidebar = this.cookieService.get('sidebar');
    this.setSidebar(this.sidebar);
  }

  /* In the beggining, set the sidebar taken and treat it depending of its status */
  setSidebar(sidebarCookie: any) {
    if (sidebarCookie === 'false') {
      const sidebarStatus: HTMLElement = document.getElementById('sidebar');
      sidebarStatus.classList.toggle('active');
      const contentStatus: HTMLElement = document.getElementById('content');
      contentStatus.classList.toggle('active');
    }
  }

  /* Set the style status. If the token is null, disable the style status. */
  getStyle() {
    let styleStatus: string = '';
    if (this.token.getToken() === '') {
      styleStatus = 'disabled';
    }
    return styleStatus;
  }

  /* Check if the token is valid to authenticate the user. */
  isLogged() {
    if (this.token.getToken() === '') {
      return false;
    }
    return true;
  }
}