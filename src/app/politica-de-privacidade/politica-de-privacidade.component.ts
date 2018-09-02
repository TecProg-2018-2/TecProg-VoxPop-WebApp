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

  constructor(private token: TokenService) { } /*Técnica: nomes significativos */

  ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);
  }

}
