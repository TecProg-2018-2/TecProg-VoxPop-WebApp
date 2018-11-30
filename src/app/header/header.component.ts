/**********************************************************************
* File: header.component.ts
* Purpose: HeaderComponent class implementation
* Notice: All rights reserved.
* Description File:  Show the header with toggle menu
***********************************************************************/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';
import { LoggerService } from '@ngx-toolkit/logger';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

/**
  *  class responsible for set up the header component dynamically.
  */
export class HeaderComponent {
 
  public assert = require('assert');


  constructor(
    private cookieService: CookieService,
    private appComponent: AppComponent,
    private logger: LoggerService
  ) { }

/**
 * Method responsible for call user logout into header
 */
  callLogout() {
    this.appComponent.logout(this.cookieService);
    this.logger.error('[ERROR] Impossible to logout user. Wrong or missing statements: cookie ', this.cookieService );
  }

  /**
  *  Method responsible for toggle the elements into menu
  *  according to the click on the sidebar.
  */
  toggleMenu() {
    const sidebar = document.getElementById('sidebar');
     sidebar.classList.toggle('active');

     const content = document.getElementById('content');
     content.classList.toggle('active');

     const elementsSidebar = sidebar.classList.contains('active');

     if (elementsSidebar) {
       this.cookieService.set('sidebar', 'false');
       this.logger.info('Sidebar off  ');
       return false;
     } else {
      this.logger.info('Sidebar on  ');
       this.cookieService.set('sidebar', 'true');
       return true;
     }
  }

}
