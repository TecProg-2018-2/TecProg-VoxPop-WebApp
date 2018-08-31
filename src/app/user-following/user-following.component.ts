import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-user-following',
  templateUrl: './user-following.component.html',
  styleUrls: ['./user-following.component.css']
})
export class UserFollowingComponent implements OnInit {

  term = '';
  tokenValue = '';
  offset = 1;
  itemsPerPage = 36;
  pages = 1;
  loading = true;

  parliamentarians: any = [
    {
      parliamentary: {
        parliamentarian_id: null,
        name: '',
        gender: '',
        federal_unit: '',
        photo: '',
        compatibility: '',
      }
    }
  ];
  auxParliamentarian: any = [
    {
      parliamentary: {
        parliamentarian_id: null,
        name: '',
        gender: '',
        federal_unit: '',
        photo: '',
        compatibility: '',
      }
    }
  ];

  constructor(private requester: RequestsService,
    private token: TokenService) { }

  ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);
    this.token.filterRestrictPage(this.tokenValue);
    this.loadPage(1, '');
  }

  loadPage(offset: number, term) {
    this.term = term;
    let req: any;
    term = term.toUpperCase();
    if (offset < 1 || isNaN(Number(offset))) {
      alert('Número de páginas inválido, favor digitar um número positivo');
      return;
    }
    this.offset = Number(offset);
    req =  this.requester.getSearchFollowingParliamentarians(this.itemsPerPage, (this.offset - 1) * this.itemsPerPage, term);
    this.handleFollowingParliamentariansResponse(req, this.offset);
  }

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
