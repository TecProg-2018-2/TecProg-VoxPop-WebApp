import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { RequestsService } from '../requests.service';

/**
 * Primeira Técnica de programação: Estilo de Design
 * Indentação: 2 espaços
 * Uma linha para separar dois blocos de código
 * Declarar o tipo das variáveis
 */

@Component({
  selector: 'app-most-followed',
  templateUrl: './most-followed.component.html',
  styleUrls: ['./most-followed.component.css']
})
export class MostFollowedComponent implements OnInit {

  loading: boolean = true;

  constructor(
    private tokenService: TokenService, /*Técnica: nomes significativos*/
    private requestService: RequestsService, /*Técnica: nomes significativos*/
  ) { }

  ngOnInit() {
    const tokenValue: string = this.tokenService.getToken(); /*Técnica: declarar o mais tarde, inicializar e usar constante*/
    this.tokenService.checkToken(tokenValue);
    this.parliamentariansMoreOften();
  }

  parliamentariansMoreOften() { /*Técnica: nomes significativos*/
    const request: any =  this.requestService.getMostFollowed(); /*Técnica: nomes significativos, inicializar e usar constante.*/
    this.handleParliamentariansMoreOften(request);
  }

  handleParliamentariansMoreOften(request) { /*Técnica: nomes significativos*/
    request.subscribe( response => {
      const parliamentariansMoreOftenValue: any[] = response['body']['results']; /*Técnica: nomes significativos, declarar o mais tarde e usar constante*/
      this.loading = false;
    });
  }

}
