import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from '../requests.service';
import { TokenService } from '../token.service';
import { CookieService } from 'ngx-cookie-service';
import { AssertComponent } from '../../assert';
import { ParlimentarianCompModel } from '../../models/parlimentarian';
import { Log } from '../logger/logger';

@Component({
  selector: 'app-see-politician',
  templateUrl: './see-politician-detail.component.html',
  styleUrls: ['./see-politician-detail.component.css']
})

export class SeePoliticianDetailedComponent implements OnInit {
  private tokenValue = '';
  public sub: any;
  public id = 0;
  public unfollow;
  public follow;
  private loading = false;
  private loader = true;
  private parlimentarian: ParlimentarianCompModel;
  public gender = '';

  private  assert = require('assert');

  private log: Log = new Log();

  constructor(
    private route: ActivatedRoute,
    private requester: RequestsService,
    private token: TokenService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.log.debug('Teste', {teste: 'olá'});
    this.token.checkToken(this.tokenValue);

    this.assert.assert(this.tokenValue == null, 'Token vazio');

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.checkParliamentarianFollowed();
    this.requester.getParlimentarianSpecific(this.id).subscribe( response => {
      this.parlimentarian = response['body'] as ParlimentarianCompModel;
      if (this.parlimentarian['gender'] === 'M') {
        this.gender = 'Masculino';
      } else if (this.parlimentarian['gender'] === 'F') {
        this.gender = 'Feminino';
      } else {
        this.gender = 'N/A';
      }
      this.loader = false;
    }, error => {
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
    });
  }

  followParliamentarian() {
    this.loading = true;
    let status;
      this.requester.postFollow(this.parlimentarian.id).subscribe(response => {

      this.assert.ok(response != null || undefined, 'O dado obtido é nulo ou indefinido.');

      status = response.status;
      this.renderUnfollowButton();
    });
    //Return removed
  }

  unfollowParliamentarian() {
    this.loading = true;
    let status;
    this.requester.deleteFollow(this.parlimentarian.id).subscribe(response => {

    this.assert.ok(response != null || undefined, 'O dado obtido é nulo ou indefinido.');

      status = response.status;
      this.renderFollowButton();
    });
    //Return removed

  }

  renderUnfollowButton() {

    this.unfollow = document.getElementById('unfollow').style.display = 'block';
    this.follow = document.getElementById('follow').style.display = 'none';
    this.loading = false;
    //Return removed

  }

  renderFollowButton() {
    const unfollow = document.getElementById('unfollow').style.display = 'none';
    const follow = document.getElementById('follow').style.display = 'block';
    this.loading = false;
    //Return removed

  }

  derrenderBothButtons() {
    const unfollow = document.getElementById('follow').style.display = 'none';
    const follow = document.getElementById('unfollow').style.display = 'none';
    //Return removed

  }

  checkParliamentarianFollowed() {
    this.requester.getFollow(this.id).subscribe( response => {

      this.assert.ok(response != null || undefined, 'O dado obtido é nulo ou indefinido.');

      if (response['status'] === 200) {
        this.renderUnfollowButton();
      } else {
        this.derrenderBothButtons();
        alert('Político não encontrado');
      }
    }, error => {
      if (error['status'] === 404) {
        this.renderFollowButton();
      } else {
        this.derrenderBothButtons();
        // alert('Erro inesperado, favor recarregar a página novamente em alguns minutos');
      }
    });
    //Return removed

  }

}
