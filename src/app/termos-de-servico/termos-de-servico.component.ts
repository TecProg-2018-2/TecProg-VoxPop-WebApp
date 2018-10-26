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

export class TermosDeServicoComponent implements OnInit {
  tokenValue = '';
  assert = require('assert');

  constructor(
    private requester: RequestsService,
    private cookieService: CookieService,
    private token: TokenService
    ) { }

  ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);

    this.assert.assert(this.tokenValue == null, 'Token vazio');
  }
}
