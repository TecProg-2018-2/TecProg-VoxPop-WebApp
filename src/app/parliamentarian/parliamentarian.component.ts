import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';
import { Token } from '@angular/compiler';
import { RequestsService } from '../requests.service';
import { PropositionModel } from '../../models/proposition';

@Component({
  selector: 'app-parliamentarian',
  templateUrl: './parliamentarian.component.html',
  styleUrls: ['./parliamentarian.component.css']
})
export class ParliamentarianComponent implements OnInit {

  public pages: number = 1;
  public itemsPerPage: number = 36;
  public offset: number = 1;
  public loading: boolean = true;

  constructor(
    private cookieService: CookieService,
    private tokenService: TokenService,
    private requestService: RequestsService,
  ) { }

  ngOnInit() {
    const tokenValue: string = this.tokenService.getToken();
    this.tokenService.checkToken(tokenValue);
    this.loadPage(1, '');

    if (tokenValue) {
      document.getElementById('userFollowing').style.display = 'none';
    } else {
      document.getElementById('userFollowing').style.display = 'block';
    }
  }

  /**
   * Search by parliaments according to the number of pages to load on the HTML page
   * @param offset page offset value
   * @param termValue query to be used in the search for parliamentarians.
   */
  loadPage(offset: number, termValue) {
    const term: string = termValue.toUpperCase();
    if (offset < 1 || isNaN(Number(offset))) {
      alert('Número de páginas inválido, favor digitar um número positivo');
      return;
    } else { // Tecninca: Priorizar Clareza
      this.offset = Number(offset);
      const request: any = this.requestService.getSearchedParliamentarian(this.itemsPerPage, (this.offset - 1) * this.itemsPerPage, term);
      this.handleParliamentariansSearchResponse(request, this.offset, term);
    }
  }

  /**
   * Method that loads the HTML page with the result of the request.
   * @param request API search result
   * @param offset page offset value
   * @param term query to be used in the research by parliamentarians.
   */
  handleParliamentariansSearchResponse(request, offset, termValue) {
    this.requestService.getSearchedParliamentarian(this.itemsPerPage, (offset - 1) * this.itemsPerPage, termValue).subscribe(response => {
      const parliamentarians: any[] = response['body']['results'];
      const auxPages: number = Math.ceil(response['body']['count'] / this.itemsPerPage);
      if (auxPages == 0) {
        alert('A pesquisa não retornou resultados');
        return;
      } else if (parliamentarians.length <= 0) {
        alert('Número da página inválido, favor digitar entre 1 e ' + this.pages);
        return;
      }
      this.pages = auxPages;
      this.updateButtonsAppearence(this.offset, this.pages);
      this.loading = false;
    });
  }

  /**
   * Method responsible for updating button style
   * @param offset  page offset value
   * @param limit page limit value
   */
  updateButtonsAppearence(offset, limit) {
    if (offset === 1) {
      document.getElementById('beforeBtn1').style.display = 'none';
      document.getElementById('beforeBtn2').style.display = 'none';
    } else {
      document.getElementById('beforeBtn1').style.display = 'block';
      document.getElementById('beforeBtn2').style.display = 'block';
    }
    if (offset === limit) {
      document.getElementById('afterBtn1').style.display = 'none';
      document.getElementById('afterBtn2').style.display = 'none';
    } else {
      document.getElementById('afterBtn1').style.display = 'block';
      document.getElementById('afterBtn2').style.display = 'block';
    }
    if (this.pages < 2) {
      document.getElementById('pageBtn1').style.display = 'none';
      document.getElementById('pageBtn2').style.display = 'none';
    } else {
      document.getElementById('pageBtn1').style.display = 'block';
      document.getElementById('pageBtn2').style.display = 'block';
    }
  }

}
