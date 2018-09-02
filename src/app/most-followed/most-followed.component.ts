import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-most-followed',
  templateUrl: './most-followed.component.html',
  styleUrls: ['./most-followed.component.css']
})
export class MostFollowedComponent implements OnInit {

  loading: boolean = true;

  constructor(
    private tokenService: TokenService, 
    private requestService: RequestsService,
  ) { }

  ngOnInit() {
    const tokenValue: string = this.tokenService.getToken();
    this.tokenService.checkToken(tokenValue);
    this.parliamentariansMoreOften();
  }

  /**
   * Requisita a API para pegar as estatísticas dos parlamentares.
   */
  parliamentariansMoreOften() { 
    const request: any =  this.requestService.getMostFollowed();
    this.handleParliamentariansMoreOften(request);
  }

  /**
   * Carrega o objeto da página HTML com o valor recebido da requisição.
   * @param request objeto que guarda o resultado de uma requisição
   */
  handleParliamentariansMoreOften(request) {
    request.subscribe( response => {
      const parliamentariansMoreOftenValue: any[] = response['body']['results']; 
      this.loading = false;
    });
  }

}
