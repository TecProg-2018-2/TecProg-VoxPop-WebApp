  /**********************************************************************
  * File: see-compatible-parliamenterian.component.ts
  * Purpose: SeeCompatibleParliamenterianComponent class implementation
  * Notice: All rights reserved.
  * Description File:  Check compatibility between parliamentary and user
  ***********************************************************************/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RequestsService } from '../requests.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-see-compatible-parliamenterian',
  templateUrl: './see-compatible-parliamenterian.component.html',
  styleUrls: ['./see-compatible-parliamenterian.component.css']
})


/**
  *  Responsible class for verify compatibility
  *  with the parliamentarian.
  */
export class SeeCompatibleParliamenterianComponent  implements OnInit {

  tokenValue = '';
  loadingStatus = true;
  mostCompatible: any[] = []; // Responsible variable to list of Parlamentarian in descending order;


  constructor(
    private cookieService: CookieService,
    private token: TokenService,
    private requester: RequestsService,
  ) { }

  /**
   * Default routine to initialize
   * component
   */
  ngOnInit() {
    /**
     * Ensure that the token is validated
     */
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);
    this.token.filterRestrictPage(this.tokenValue);
    this.getMostCompatible();
  }

  /**
   * Responsible routine to receive the most
   * compatibility with parlametarian
   */
  getMostCompatible() {
    let request: any = null;
    request =  this.requester.getMostCompatible();

    if (request !== null) {
      this.handleMostCompatibleResponse(request);
      return request;
    } else {
      this.mostCompatible = [];
    }
  }

  /**
  * Responsible routine to assign the result
  * of the request to a variable
  * @param request Responsible request to receive the most compatible parlametarian
  */
  handleMostCompatibleResponse(request: any) {
    if (request !== null) {
      /**
       * Assign the result of the request to a variable to
       * use in see-compatible-parlamenterian.component.html
       */
      request.subscribe( response => {
        this.mostCompatible = response['body']['results'];
        this.loadingStatus = false;
      });
    } else {
      this.mostCompatible = [];
    }
  }
}
