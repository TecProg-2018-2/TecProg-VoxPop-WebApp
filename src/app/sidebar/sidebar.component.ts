/**********************************************************************
* File: sidebar.component.ts
* Purpose: SidebarComponent class implementation
* Notice: All rights reserved.
* Description File: Creates the sidebar component to menu/pages of VoxPop. 
***********************************************************************/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
/**
 * Creates the sidebar component, used in the pages.
 * @class 
 */
export class SidebarComponent implements OnInit {
/**
 * Default constructor
 * @param cookieService 
 * @param token 
 */
  constructor(
    private cookieService: CookieService,
    private token: TokenService,
  ) { }

  sidebar: string = '';
  tokenValue: string = '';
/**
 * Default routine to initialize component.
 */
  ngOnInit() {
    this.sidebar = this.cookieService.get('sidebar');
    this.setSidebar(this.sidebar);
  }
/**
 * Method responsible for set the menu sidebar, 
 * activating and deactivating it according to the user's permission
 * @param sidebarCookie 
 */
  setSidebar(sidebarCookie: any) {
    /* If sidebar cookie inexists, the sidebar is deactivate
    */
    if (sidebarCookie === 'false') {
      const sidebarStatus: HTMLElement = document.getElementById('sidebar');
      sidebarStatus.classList.toggle('active');
      const contentStatus: HTMLElement = document.getElementById('content');
      contentStatus.classList.toggle('active');
    }
  }
/**
 * Method responsible for disabling sidebar.
 * @return the sidebar status (disabled or enabled)
 */
  getStyle() {
    let styleStatus: string = '';
    /* 
    * If token is empty, the status of sidebar is 'disabled'
    */
    if (this.token.getToken() === '') {
      styleStatus = 'disabled';
    }
    return styleStatus;
  }
/**
 * Method that checks if the user is logged in.
 * @return the login status 
 */
  isLogged() {
    /*
    * If token is empty, user is not logged.
    */
    if (this.token.getToken() === '') {
      return false;
    }
    return true;
  }
}
