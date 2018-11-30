/**********************************************************************
* File: parliamentarian.component.ts
* Purpose: ParliamentarianComponent class implementation
* Description File: Separetes parliamentarians in pages.
***********************************************************************/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';
import { Token } from '@angular/compiler';
import { RequestsService } from '../requests.service';
import { PropositionModel } from '../../models/proposition';
import { LoggerService } from '@ngx-toolkit/logger';

@Component({
  selector: 'app-parliamentarian',
  templateUrl: './parliamentarian.component.html',
  styleUrls: ['./parliamentarian.component.css']
})
export class ParliamentarianComponent implements OnInit {

  public pages: number = 1; // number of pages
  public itemsPerPage: number = 36; // numbero of itens per page
  public offset: number = 1;
  public loading: boolean = true;
  private logger: LoggerService;

  constructor(
    private cookieService: CookieService,
    private tokenService: TokenService,
    private requestService: RequestsService,
  ) { }

  /**
   * Default routine to initialize component
  */
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
      this.logger.warn('Entrada inválida para número de páginas');
      alert('Número de páginas inválido, favor digitar um número positivo');
      return;
    } else {
      this.offset = Number(offset);

      try {
        const request: any = this.requestService.getSearchedParliamentarian(this.itemsPerPage, (this.offset - 1) * this.itemsPerPage, term);
        this.handleParliamentariansSearchResponse(request, this.offset, term);
      } catch (Error) {
        alert(Error.message);
        this.logger.error(Error.message);
      }

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
        this.logger.warn('Pesquisa sem resultados');
        alert('A pesquisa não retornou resultados');
        return;
      } else if (parliamentarians.length <= 0) {
        this.logger.warn('Entrada de número inválido');
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
    /**
     * According offset value the appearence of buttons change.
    */

    //Paragraph to update beforeBtn
    if (offset === 1) {
      this.updatePageElements('beforeBtn1', 'beforeBtn2', 'none');
      this.logger.log('Setting "none" to beforeBtn1 and 2. Offset: ' + offset);
    } else {
      this.updatePageElements('beforeBtn1', 'beforeBtn2', 'block');
      this.logger.log('Blocking beforeBtn1 and 2. Offset: ' + offset);
    }

    //Paragraph to update afterBtn
    if (offset === limit) {
      this.updatePageElements('afterBtn1', 'afterBtn2', 'none');
      this.logger.log('Setting "none" to afterBtn1 and 2. Offset: ' + offset);
    } else {
      this.updatePageElements('afterBtn1', 'afterBtn2', 'block');
      this.logger.log('Blocking afterBtn1 and 2. Offset: ' + offset);
    }

    //Paragraph to update pageBtn
    if (this.pages < 2) {
      this.updatePageElements('pageBtn1', 'pageBtn2', 'none');
      this.logger.log('Setting "none" to pageBtn1 and 2. Page number: ' + this.pages);
    } else {
      this.updatePageElements('pageBtn1', 'pageBtn2', 'block');
      this.logger.log('Blocking pageBtn1 and 2. Page number: ' + this.pages);
    }
  }

  updatePageElements(firstElement: string, secondElement: string, style: string) {
    document.getElementById(firstElement).style.display = style;
    document.getElementById(secondElement).style.display = style;
  }

}
