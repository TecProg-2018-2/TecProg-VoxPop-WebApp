/**********************************************************************
  * File: see-politician-detail.component.ts
  * Purpose: SeePoliticianDetailedComponent class implementation
  * Notice: All rights reserved.
  * Description File:  Show Politician detail.
  ***********************************************************************/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from '../requests.service';
import { TokenService } from '../token.service';
import { CookieService } from 'ngx-cookie-service';
import { AssertComponent } from '../../assert';
import { ParlimentarianCompModel } from '../../models/parlimentarian';
import { LoggerService } from '@ngx-toolkit/logger';

@Component({
  selector: 'app-see-politician',
  templateUrl: './see-politician-detail.component.html',
  styleUrls: ['./see-politician-detail.component.css']
})


/**
  *  Responsible class for show law projects.
  */
export class SeePoliticianDetailedComponent implements OnInit {
  tokenValue = '';
  sub: any;
  id = 0;
  unfollow;
  follow;
  loading = false;
  loader = true;
  parlimentarian: ParlimentarianCompModel;
  gender = '';

  constructor(
    private route: ActivatedRoute,
    private requester: RequestsService,
    private token: TokenService,
    private logger: LoggerService,
  ) { }

  ngOnInit() {
    const genderParlamentarian = this.parlimentarian['gender'];

    this.logger.info('Iniciando ngOnInit');
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.checkParliamentarianFollowed();
    this.requester.getParlimentarianSpecific(this.id).subscribe( response => {
      this.parlimentarian = response['body'] as ParlimentarianCompModel;
      this.verifyParlimentarian(genderParlamentarian); //T36
    }, this.errorParlamentarian );
  }

  /**
   * Paragraph of requests of parlimentarian
   * T34  and T35
   */
  followParliamentarian() {
    this.loading = true;
    let status;
      this.requester.postFollow(this.parlimentarian.id).subscribe(response => {

      status = response.status;
      this.renderUnfollowButton();
    });
  }

  unfollowParliamentarian() {
    this.loading = true;
    let status;
    this.requester.deleteFollow(this.parlimentarian.id).subscribe(response => {

      status = response.status;
      this.renderFollowButton();
    });
  }

   /**
   * Paragraph of operations for set style of HTML elements
   * T34  and T35
   */
  renderUnfollowButton() {

    this.unfollow = document.getElementById('unfollow').style.display = 'block';
    this.follow = document.getElementById('follow').style.display = 'none';
    this.loading = false;
    return true;
  }

  renderFollowButton() {
    const unfollow = document.getElementById('unfollow').style.display = 'none';
    const follow = document.getElementById('follow').style.display = 'block';
    this.loading = false;
    return true;
  }

  derrenderBothButtons() {
    const unfollow = document.getElementById('follow').style.display = 'none';
    const follow = document.getElementById('unfollow').style.display = 'none';
    return true;
  }


  /**
   * Paragraph of parlimentarian operations
   * T34, T35 and T36
   */
  setGender(gender: string){
    this.gender = gender;
  }

  verifyParlimentarian(data: string) {
    if (data === 'M') {
      this.setGender('Masculino');  //T36
    } else if (data === 'F') {
      this.setGender('Feminino'); //T36
    } else {
      this.setGender('N/A');  //T36
    }
    this.loader = false;
  }

  checkParliamentarianFollowed() {
    this.requester.getFollow(this.id).subscribe( response => {

      if (response === null || response === undefined) {
        this.logger.error('Resposta nula ou indefinida');
      }

      if (response['status'] === 200) {
        this.renderUnfollowButton();
        this.logger.info('Status 200');
      } else {
        this.derrenderBothButtons();
        alert('Político não encontrado');
      }
    }, error => {
      if (error['status'] === 404) {
        this.renderFollowButton();
        this.logger.info('Status 404');
      } else {
        this.derrenderBothButtons();
        this.logger.error('Erro inesperado, recarregar a página');
      }
    });
    return true;
  }

  //T36
  errorParlamentarian() {
    this.parlimentarian = {
      id: null,
      name : 'DEPUTADO NÃO ENCONTRADO',
      gender : 'N/A',
      political_party: 'N/A',
      federal_unit: 'N/A',
      photo: 'N/A',
      birth_date: 'N/A',
      education: 'N/A',
      email: 'N/A',
      compatibility: 'N/A',
    };
  }
}
