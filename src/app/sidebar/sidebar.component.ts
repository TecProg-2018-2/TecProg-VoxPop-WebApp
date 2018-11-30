/**********************************************************************
* File: sidebar.component.ts
* Purpose: SidebarComponent class implementation
* Notice: All rights reserved.
* Description File: Creates the sidebar component to menu/pages of VoxPop.
***********************************************************************/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';

/* Component classes and its metadata. */
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

  sidebar = '';
  tokenValue = '';
  assert = require('assert');

/**
 * Default constructor
 * @param cookieService
 * @param token
 */
  constructor(
    private cookieService: CookieService,
    private token: TokenService,
  ) { }

  ngOnInit() {
    this.sidebar = this.cookieService.get('sidebar');
    this.setSidebar(this.sidebar);
  }

  // T34 e T35
  // Paragraph for set sidebar
/**
 * Method responsible for set the menu sidebar,
 * activating and deactivating it according to the user's permission
 * @param sidebarCookie
 */
  setSidebar(sidebarCookie: any) {
    // If sidebar cookie inexists, the sidebar is deactivate
    if (sidebarCookie === 'true') {
      // T36
      this.showStyleSuccess();
    } else {
      // T36
      this.showStyleFailed();
    }
  }

  // T34 e T35
  // Paragraph for logged
/**
 * Method that checks if the user is logged in.
 * @return the login status
 */
  isLogged() {
    // If token is empty, user is not logged.
    if (this.token.getToken() === '') {
      return false;
    } else {
      return true;
    }
  }

  // T34 e T35
  // Paragraph for styles of sidebar
  // T36
  showStyleSuccess() {
    const sidebarStatus: HTMLElement = document.getElementById('sidebar');
      this.assert.ifError(sidebarStatus == null);
      sidebarStatus.classList.toggle('active');
    const contentStatus: HTMLElement = document.getElementById('content');
      contentStatus.classList.toggle('active');
  }

  // T36
  showStyleFailed() {
    const sidebarStatus: HTMLElement = document.getElementById('sidebar');
      this.assert.ifError(sidebarStatus == null);
      sidebarStatus.classList.toggle('deactive');
    const contentStatus: HTMLElement = document.getElementById('content');
      contentStatus.classList.toggle('deactive');
  }

  /**
   * Method responsible for disabling sidebar.
   * @return the sidebar status (disabled or enabled)
   */
    getStyle() {
      let styleStatus;
      /*
      * If token is empty, the status of sidebar is 'disabled'
      * Else sidebar is active
      */
      if (this.token.getToken() === '') {
        styleStatus = 'disabled';
      } else {
        styleStatus = '';
      }
        return styleStatus;
    }
}

