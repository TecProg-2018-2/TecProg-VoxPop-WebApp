import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-user-following',
  templateUrl: './user-following.component.html',
  styleUrls: ['./user-following.component.css']
})
export class UserFollowingComponent implements OnInit {

  constructor(
    private requester: RequestsService,
    private cookieService: CookieService,
    private token: TokenService
  ) { }

  tokenValue: string = '';
  ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);
    this.token.filterRestrictPage(this.tokenValue);
    this.loadPage(1, '');
  }

  offset: number = 1;
  itemsPerPage: number = 36;
  termOnSearch: string = '';
  loadPage(offset: number, termOnSearch) {
    this.termOnSearch = termOnSearch;
    let requisition: any; // T5 - NOME DE VARIÁVEIS MAIS SIGNIFICATIVOS
    termOnSearch = termOnSearch.toUpperCase();
    if (offset < 1 || isNaN(Number(offset))) {
      alert('Número de páginas inválido, favor digitar um número positivo');
      return;
    }
    this.offset = Number(offset);
    requisition =  this.requester.getSearchFollowingParliamentarians(this.itemsPerPage, (this.offset - 1) * this.itemsPerPage, termOnSearch);
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

  loading: boolean = true;
  pages: number = 1;
  handleFollowingParliamentariansResponse(request, offset) {
    request.subscribe( response => {
      this.auxParliamentarian = response['body']['results'];
      const auxPages = Math.ceil(response['body']['count'] / this.itemsPerPage);
      this.pages = auxPages;
      this.parliamentarians = this.auxParliamentarian;
      this.parliamentarians = this.auxParliamentarian;
      this.loading = false;
    });
  }
}
