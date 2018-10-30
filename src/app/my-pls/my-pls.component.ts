import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';
import { UpdateVoteModel } from '../../models/vote';

@Component({
  selector: 'app-my-pls',
  templateUrl: './my-pls.component.html',
  styleUrls: ['./my-pls.component.css']
})
export class MyPlsComponent implements OnInit {

  //Técnica: Código organizado.    
  public showEditButtons: boolean = false;
  public pages: number = 1;
  public offset: number = 0;
  public votePosition: number;
  public propositionVote: any;
  public loading = true;

  //Técnica: Não deixe que os outros mexam onde não devem.     
  private itemsPerPage: number = 10;
  private userId: number;
  private assert = require('assert'); 

  public proposition: any = [
    {
      option: null,
      proposition_id: null,
      proposition_type: '',
      proposition_type_initials: '',
      number: null,
      year: null,
      abstract: '',
      processing: '',
      situation: '',
      url_full: ''
    }
  ];

  constructor(
    private requester: RequestsService,
    private cookieService: CookieService,
    private token: TokenService
  ) { }

  ngOnInit() {
    var tokenValue: string = this.token.getToken();
    this.userId = Number(this.cookieService.get('userID'));
    this.token.checkToken(tokenValue);

    this.assert.assert(tokenValue == null, 'Token vazio');

    this.token.filterRestrictPage(tokenValue);
    this.votePosition = 0;
    this.propositions(1, '');
  }

  propositions(offset: number, term) {
    if (offset < 1 || isNaN(Number(offset)) || offset > this.pages) {
      alert('Número de páginas inválido, favor digitar um número positivo');
      return;
    }
    var term: any = term.toUpperCase();
    var numberPLsVoted: number = 1;
    let requisition: any;
    this.pages = 1;
    this.proposition = [];

    this.assert.ok(this.pages != null);
    this.assert.ok(numberPLsVoted != null);

    requisition = this.requester.getSearchVotedProposition((offset - 1) * this.itemsPerPage, term);
    this.handlePropositionsSearchResponse(requisition, offset);
    return requisition;
  }

  handlePropositionsSearchResponse(request, offset) {
    request.subscribe(response => {
      const body = response['body'];
      this.propositionVote = body['results'];
      // console.log(this.propositionVote);
      this.offset = offset;
      this.pages = Math.ceil(response['body']['count'] / this.itemsPerPage);
      this.loading = false;
    });
  }

  specifyProposition(position, showButtons) {
    this.votePosition = position;
    this.showEditButtons = showButtons;
  }

  editVote(opinion: string) {
    let status;
    const vote: UpdateVoteModel = {
      user: this.userId,
      proposition: this.propositionVote[this.votePosition].proposition.id,
      option: opinion
    };

    this.requester.updateVote(vote, this.propositionVote[this.votePosition]['id']).subscribe(response => {
      status = response.status;

      this.assert.ok(status != null);

      if (!this.requester.didSucceed(status)) {
        alert('Voto não editado, favor tentar de novo mais tarde');
      } else {
        alert('Voto editado com sucesso!');
        this.propositions(1, '');
      }

    });
  }
}
