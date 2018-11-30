/**********************************************************************
* File: politica-de-privacidade.component.ts
* Purpose: PoliticaDePrivacidadeComponent class implementation
* Description File: Defines privacy policies.
***********************************************************************/

import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-politica-de-privacidade',
  templateUrl: './politica-de-privacidade.component.html',
  styleUrls: ['./politica-de-privacidade.component.css']
})
export class PoliticaDePrivacidadeComponent implements OnInit {

  tokenValue: string = '';

  constructor(private token: TokenService) { }

  /**
   * Default routine to initialize component
  */
  ngOnInit() {
    /**
     * Ensure that the token is validated
    */
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);
  }

}
