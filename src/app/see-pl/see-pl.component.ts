  /**********************************************************************
  * File: see-pl.component.ts
  * Purpose: SeePlComponent class implementation
  * Notice: All rights reserved.
  * Description File:  Check compatibility between parliamentary and user
  ***********************************************************************/

import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { PropositionModel } from '../../models/proposition';
import { TokenService } from '../token.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-see-pl',
  templateUrl: './see-pl.component.html',
  styleUrls: ['./see-pl.component.css']
})

/**
  *  Responsible class for show law projects.
  */
export class SeePlComponent implements OnInit {

  tokenValue: string = '';
  numberPLs: number; // Number of Law Projects 
  pages: number = 1;
  itemsPerPage: number = 20;
  offset: number = 1;
  loading: boolean = true; 
  position: number = 0;

  proposition: any = [
    {
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

  auxProposition: any = [
    {
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
    private token: TokenService,
  ) { }

  /**
   * Default routine to initialize 
   * component
   */
  ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);
    this.loadPage(1);
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);
  }

  /**
   * Responsible routine load page according
   * to the number entered in the search.
   */
  loadPage(offset: number) {
    let request: any;
    if (offset < 1 || isNaN(Number(offset))) {
      alert('Número de páginas inválido, favor digitar um número positivo');
      return false;
    }
    this.offset = Number(offset);
    request =  this.requester.getProposition(this.itemsPerPage, (this.offset - 1) * this.itemsPerPage);
    this.handlePropositionsResponse(request, this.offset);
    return request;
  }

  /**
   * Method responsible for verifing informations 
   * obtained from a given page and treat the same 
   * data.
   */
  handlePropositionsResponse(request, offset) {
    this.requester.getProposition(this.itemsPerPage, (offset - 1) * this.itemsPerPage).subscribe( response => {
      this.auxProposition = response.body['results'];
      this.numberPLs = response.body['count'];
      this.pages = Math.ceil(this.numberPLs / this.itemsPerPage);
      if (this.auxProposition.length <= 0) {
        alert('Número da página inválido, favor digitar entre 1 e ' + this.pages);
        return false;
      }
      this.updateButtonsAppearence(this.offset, this.pages);
      this.proposition = this.auxProposition;
      this.loading = false;
    });
  }


  updateButtonsAppearence(offset, limit) {
    /**
     * According offset value the appearence of
     * buttons change. 
     */
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
    return true;
  }

  /**
   * Method responsible for defining the specific 
   * proposition according to the index inserted.
   */
  setSpecificProposition(index) {
    this.position = index;
  }
}
