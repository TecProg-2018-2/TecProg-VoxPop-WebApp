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

@Component({
  selector: 'app-termos-de-servico',
  templateUrl: './termos-de-servico.component.html',
  styleUrls: ['./termos-de-servico.component.css']
})


/**
  *  Responsible class for show law projects.
  */
export class TermsOfServiceComponent implements OnInit {
  tokenValue = '';

  constructor(
    private requester: RequestsService,
    private cookieService: CookieService,
    private token: TokenService
    ) { }

  ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);

  }
}
