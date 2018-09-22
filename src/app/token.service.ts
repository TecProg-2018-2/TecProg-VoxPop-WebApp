  /**********************************************************************
  * File: token.service.ts
  * Purpose: TokenService class implementation
  * Notice: All rights reserved.
  * Description File: Responsible for all session token operations
  ***********************************************************************/

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

/**
 * Responsible for all session token operations
 */
@Injectable()
export class TokenService {
  
  /**
   * Creates an instance of token service.
   * @param router Angular class that navigates other pages
   * @param cookieService Service that operates on session cookies  
   */
  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) { }

  /**
   * Gets token from session cookie
   * @returns token value
   */
  getToken(): string {
    var tokenValue = this.cookieService.get('basic_token');

    /* Checks whether the token has been stored in two session cookie variables */
    if(tokenValue != '') {
      return 'Token ' + tokenValue;
    }
    else {
      tokenValue = this.cookieService.get('bearer_token');
      if(tokenValue != '') {
        return 'Bearer ' + tokenValue;
      }
    }
    return '';
  }

  /**
   * Checks token is valid
   * @param token token value
   * @returns true if token 
   */
  checkToken(token: any): boolean {
    /* If the token is valid it disables some features and releases other */
    if (token === '') {
      return false;
    } else {
      // TODO: Change the style from template.
      document.getElementById('register').style.display = 'none';
      document.getElementById('login').style.display = 'none';
      document.getElementById('deSuaOpiniao').style.display = 'block';
      document.getElementById('profile').style.display = 'block';
      document.getElementById('logout').style.display = 'block';
      return true;
    }
  }
  
  /**
   * Determines the route according to the token
   * @param token token value
   * @returns true if restrict page 
   */
  filterRestrictPage(token: any): boolean {
    /* if there is no token it means that the user is not logged in */
    if (token === '') {
      this.router.navigate(['login']);
      return true;
    } 
    return false;
  }
  
  /**
   * Filters login page
   * @param token 
   * @returns true if login page 
   */
  filterLoginPage(token: any): boolean {
    if (token !== '') {
      this.router.navigate(['']);
      return true;
    }
    return false;
  }
}
