/**********************************************************************
* File: user-following.component.ts
* Purpose: UserFollowingComponent class implementation
* Notice: All rights reserved.
* Description File: Creates the 'user following' component to make following user on platform.
***********************************************************************/
import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-user-following',
  templateUrl: './user-following.component.html',
  styleUrls: ['./user-following.component.css']
})
/**
 * Class to request follow to a user.
 * @class
 */
export class UserFollowingComponent implements OnInit {

  assert = require('assert');

  /**
   * Default constructor
   * @param requester
   * @param cookieService
   * @param token
   */
  constructor(
    private requester: RequestsService,
    private cookieService: CookieService,
    private token: TokenService
  ) { }

  /**
   * Default routine to initialize component.
   */
  tokenValue: string = '';
  ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);
    this.token.filterRestrictPage(this.tokenValue);
    this.loadPage(1, '');
  }

  /**
   * Load the page with following parliamentarians.
   * @param offset
   * @param termOnSearch
   */
  offset: number = 1;
  itemsPerPage: number = 36;
  termOnSearch: string = '';
  loadPage(offset: number, termOnSearch) {
    this.termOnSearch = termOnSearch;
    let requisition: any; // T5 - NOME DE VARIÁVEIS MAIS SIGNIFICATIVOS
    termOnSearch = termOnSearch.toUpperCase();
    /*
     * If number of page is invalid this alert.
     */
    if (offset < 1 || isNaN(Number(offset))) {
      alert('Número de páginas inválido, favor digitar um número positivo');
      return;
    }
    this.offset = Number(offset);
    requisition = this.requester.getSearchFollowingParliamentarians(this.itemsPerPage, (this.offset - 1) * this.itemsPerPage, termOnSearch);
    this.assert.notEqual(requisition, 'null' || 'undefined');
    this.handleFollowingParliamentariansResponse(requisition, this.offset);
  }

  parliamentarians: any = [
    {
      parliamentary: {
        parliamentarianId: null,
        name: '',
        gender: '',
        federalUnit: '',
        photo: '',
        compatibility: '',
      }
    }
  ];
  auxParliamentarian: any = [
    {
      parliamentary: {
        parliamentarianId: null,
        name: '',
        gender: '',
        federalUnit: '',
        photo: '',
        compatibility: '',
      }
    }
  ];

  /**
   * Request all parlamentarians following.
   * @param offset
   * @param request
   */
  loading: boolean = true;
  pages: number = 1;
  handleFollowingParliamentariansResponse(request, offset) {

    this.assert.notEqual(request, 'null' || 'undefined');
    request.subscribe(response => {
      this.auxParliamentarian = response['body']['results'];
      const auxPages = Math.ceil(response['body']['count'] / this.itemsPerPage);
      this.pages = auxPages;
      this.parliamentarians = this.auxParliamentarian;
      this.parliamentarians = this.auxParliamentarian;
      this.loading = false;
    });
  }
}
