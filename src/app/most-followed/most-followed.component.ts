import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { RequestsService } from '../requests.service';

/**
 * Primeira Técnica de programação: Estilo de Design
 * Indentação: 2 espaços
 * Uma linha para separar dois blocos de código
 * Declarar o tipo das variáveis
 * Remover variáveis que não estão sendo utilizadas.
 */

@Component({
  selector: 'app-most-followed',
  templateUrl: './most-followed.component.html',
  styleUrls: ['./most-followed.component.css']
})
export class MostFollowedComponent implements OnInit {

  /*Variável global */
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

  /**
   * Requisita a API para pegar as estatísticas dos parlamentares.
   */
  parliamentariansMoreOften() { /*Técnica: nomes significativos*/
    const request: any =  this.requestService.getMostFollowed(); /*Técnica: nomes significativos, inicializar e usar constante.*/
    this.handleParliamentariansMoreOften(request);
  }

  /**
   * Carrega o objeto da página HTML com o valor recebido da requisição.
   * @param request objeto que guarda o resultado de uma requisição
   */
  handleParliamentariansMoreOften(request) { /*Técnica: nomes significativos*/
    request.subscribe( response => {
      const parliamentariansMoreOftenValue: any[] = response['body']['results']; /*Técnica: nomes significativos, declarar o mais tarde e usar constante*/
      this.loading = false;
    });
  }

}
