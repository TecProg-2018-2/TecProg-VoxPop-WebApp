/**********************************************************************
* File: most-followed.component.ts
* Purpose: MostFollowedComponent class implementation
* Description File:  Get the most followed parliamentary's informations
***********************************************************************/

import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-most-followed',
  templateUrl: './most-followed.component.html',
  styleUrls: ['./most-followed.component.css']
})
/**
 * Most followed parliamentarians
 */
export class MostFollowedComponent implements OnInit {

  loading: boolean = true;

  constructor(
    private tokenService: TokenService,
    private requestService: RequestsService,
  ) { }

  /**
   * Default routine to initialize component
   */
  ngOnInit() {
    /**
     * Ensure that the token is validated
    */
    const tokenValue: string = this.tokenService.getToken();
    this.tokenService.checkToken(tokenValue);
    this.parliamentariansMoreOften();
  }

  /**
   * Get from API the informations of the most followed parliamentary.
  */
  parliamentariansMoreOften() {
    const request: any =  this.requestService.getMostFollowed();
    this.handleParliamentariansMoreOften(request);
  }

  /**
   * Load the HTML page with the request's value.
   * @param request Responsible request to receive the parliamentary's informations.
   */
  handleParliamentariansMoreOften(request) {
    /**
     * Assign the result of the request to a variable to use in most-followed.component.html
     */
    request.subscribe( response => {
      const parliamentariansMoreOftenValue: any[] = response['body']['results'];
      this.loading = false;
    });
  }

}
