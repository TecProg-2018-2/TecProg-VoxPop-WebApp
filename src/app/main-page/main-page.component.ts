import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';
import { Token } from '@angular/compiler';
import { RequestsService } from '../requests.service';

declare var Chart: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  tokenValue: string = '';
  loadingStatus: boolean = true;
  idValue: number;
  propositionCtx: HTMLElement;
  parliamentaryCtx: HTMLElement;
  propositionChart: any;
  parliamentaryChart: any;

  proposition: any = [{
    proposition_id: 0,
    proposition_type: '',
    proposition_type_initials: '',
    number: 0,
    year: 0,
    abstract: '',
    processing: '',
    situation: '',
    url_full: ''
  }];

  mostActivesParliamentaries: any = [
    {
      parliamentary: null,
      votes: '',
    }
  ];

  constructor(
    private cookieService: CookieService,
    private token: TokenService,
    private requester: RequestsService
  ) { }

  ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);
    this.idValue = +this.cookieService.get('userID');
    this.propositions(3, 0);
    this.mostActives(3, 0);
    this.propositionCtx = document.getElementById('propositionChart');
    this.parliamentaryCtx = document.getElementById('parliamentaryChart');
  }

  propositions(limit: number, offset: number) {
    let requisition: any;
    this.proposition = [];
    requisition = this.requester.getProposition(limit, offset);
    this.handlePropositionsResponse(requisition, limit, offset);
    return requisition;
  }

  mostActives(limit: number, offset: number) {
    let requisition: any;
    this.mostActivesParliamentaries = [];
    requisition = this.requester.getMostActive(limit, offset);
    this.handleMostActivesResponse(requisition, limit, offset);
    return requisition;
  }

  handlePropositionsResponse(request, limit, offset) {
    this.requester.getProposition(limit, offset).subscribe(response => {
      const body = response['body'];
      this.proposition = body['results'];

      this.propositionChart = new Chart(this.propositionCtx, {
        // The type of chart we want to create
        type: 'horizontalBar',

        // The data for our dataset
        data: {
          labels: [2015, 2016, 2017, 2018],
          datasets: [{
            label: 'Número de votações',
            backgroundColor: 'rgb(51,122,183)',
            borderColor: 'rgb(255, 255, 255)',
            data: [96, 75, 82, 15, 0],
          }]
        },

        // Configuration options go here
        options: {}
      });
    });
  }

  handleMostActivesResponse(request, limit, offset) {
    this.requester.getMostActive(limit, offset).subscribe(response => {
      const body = response['body'];
      this.mostActivesParliamentaries = body['results'];

      let i: number;
      const labels_list: any = [], data_list: any = [];
      for (i = 0; i < this.mostActivesParliamentaries.length; i++) {
        labels_list.push(this.mostActivesParliamentaries[i]['parliamentary'].name);
        data_list.push(this.mostActivesParliamentaries[i].votes);
      }
      data_list.push(200);
      this.parliamentaryChart = new Chart(this.parliamentaryCtx, {
        // The type of chart we want to create
        type: 'horizontalBar',

        // The data for our dataset
        data: {
          labels: labels_list,
          datasets: [{
            label: 'Quantidade de votos',
            backgroundColor: 'rgb(51,122,183)',
            borderColor: 'rgb(255, 255, 255)',
            data: data_list,
          }]
        },

        // Configuration options go here
        options: {}
      });
      this.loadingStatus = false;
    });
  }

  openProposition(proposition_url) {
    window.open(
      proposition_url,
      '_blank',
      'height=700, width=820, scrollbars=yes, status=yes'
    );
  }
}
