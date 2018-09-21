/**********************************************************************
* File: header.component.ts
* Purpose: HeaderComponent class implementation
* Notice: All rights reserved.
* Description File:  Show the header with toggle menu
***********************************************************************/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

/**
  *  class responsible for set up the header component dynamically.
  */
export class HeaderComponent {

  constructor(
    private cookieService: CookieService,
    private appComponent: AppComponent,
  ) { }

/**
 * Method responsible for call user logout into header
 */
  callLogout() {
    this.appComponent.logout(this.cookieService);
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
       return false;
     } else {
       this.cookieService.set('sidebar', 'true');
       return true;
     }
  }

}
