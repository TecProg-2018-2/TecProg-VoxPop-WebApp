  /**********************************************************************
  * File: see-pl.component.ts
  * Purpose: SeePlComponent class implementation
  * Notice: All rights reserved.
  * Description File:  Check compatibility between parliamentary and user
  ***********************************************************************/

import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-see-pl',
  templateUrl: './see-pl.component.html',
  styleUrls: ['./see-pl.component.css']
})

/**
  *  Responsible class for show law projects.
  */
export class SeePlComponent implements OnInit {

  tokenValue = '';
  numberPLs: number; // Number of Law Projects
  pages = 1;
  itemsPerPage = 20;
  offset = 1;
  loading = true;
  position = 0;

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
   * @param offset
   */
  loadPage(offset: number) {
    let request: any;
    // T18
    if (offset < 1 || isNaN(Number(offset))) {
      alert('Número de páginas inválido, favor digitar um número positivo');
    } else {
      this.offset = Number(offset);
      request =  this.requester.getProposition(this.itemsPerPage, (this.offset - 1) * this.itemsPerPage);

      // T18
      if ( isNaN(Number(this.offset)) && isNaN(Number(this.pages)) ) {
        this.handlePropositionsResponse(this.offset);
      } else {
        // assertiva
      }

      // T19 e T18
      if (request !== []) {
        return request;
      } else {
        this.proposition = [];
      }
    }
  }

  /**
   * Method responsible for verifing informations
   * obtained from a given page and treat the same
   * data.
   * @param request Responsible request to receive propositions
   * @param offset Requested page
   */
  handlePropositionsResponse(offset) {
    // T18
    if (isNaN(Number(offset))) {
      this.requester.getProposition(this.itemsPerPage, (offset - 1) * this.itemsPerPage).subscribe( response => {
      this.auxProposition = response.body['results'];
      this.numberPLs = response.body['count'];
      this.pages = Math.ceil(this.numberPLs / this.itemsPerPage);

      if (this.auxProposition.length <= 0) {
        alert('Número da página inválido, favor digitar entre 1 e ' + this.pages);
      }

      // T18
      if ( isNaN(Number(this.offset)) && isNaN(Number(this.pages)) ) {
        this.updateButtonsAppearence(this.offset, this.pages);
      } else {
        // assertiva
      }

      this.proposition = this.auxProposition;
      this.loading = false;
      });
    } else {
      this.proposition = [];
    }
  }

  /**
   * Method responsible for updating appearence
   * of buttons.
   * @param offset Requested page
   * @param limit  Proposition page limit
   */
  updateButtonsAppearence(offset, limit) {
    // T18
    if ( isNaN(Number(offset)) && isNaN(Number(limit)) ) {
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
    } else {
      // assertiva
    }
  }

  /**
   * Method responsible for defining the specific
   * proposition according to the index inserted.
   * @param index
   */
  setSpecificProposition(index) {
    // T18
    if (isNaN(Number(index))) {
      this.position = index;
    } else {
      // assertiva
    }
  }
}
