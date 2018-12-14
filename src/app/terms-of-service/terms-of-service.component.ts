/**********************************************************************
  * File: terms-of-service.component.ts
  * Purpose: TermsOfServiceComponent class implementation
  * Notice: All rights reserved.
  ***********************************************************************/
import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';
import { AssertComponent } from '../../assert';
import { LoggerService } from '@ngx-toolkit/logger';


@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.css']
})

export class TermsOfServiceComponent implements OnInit {
  private tokenValue = '';
  public assert = require('assert');
  private logger: LoggerService;

  constructor(
    private requester: RequestsService,
    private cookieService: CookieService,
    private token: TokenService
  ) { }

  ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);

    this.assert.assert(this.tokenValue == null, 'Token vazio');
    if (this.token == null) {
      this.logger.warn('Token Vazio!');
    }
  }
}
