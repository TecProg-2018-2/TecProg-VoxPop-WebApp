/**********************************************************************
* File: proposition.component.ts
* Purpose: PropositionComponent class implementation
* Notice: All rights reserved.
* Description File:  Details a proposal in the Chamber of Deputies
***********************************************************************/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from '../requests.service';
import { TokenService } from '../token.service';

// Import all charts
import {
  regionChart,
  incomeChart,
  educationChart,
  raceChart,
  genderChart,
  parliamentarianChart,
  populationChart,
} from '../graphs/charts';

@Component({
  selector: 'app-proposition',
  templateUrl: './proposition.component.html',
  styleUrls: ['./proposition.component.css']
})

/**
 * Details a proposal in the Chamber of Deputies
 */
export class PropositionComponent implements OnInit {

  private tokenValue: string = '';
  public sub: any = 0;
  private idProposition: number = 0;
  public loadingStatus: boolean = true;
  private socialInformation: any = 0;
  private regionContext: HTMLElement;
  public regionChart: any = 0;
  private incomeContext: HTMLElement;
  public incomeChart: any = 0;
  private educationContext: HTMLElement;
  public educationChart: any = 0;
  private raceContext: HTMLElement;
  public raceChart: any = 0;
  private genderContext: HTMLElement;
  public genderChart: any = 0;
  private parliamentarianContext: HTMLElement;
  public parliamentarianChart: any = 0;
  private populationContext: HTMLElement;
  public populationChart: any = 0;

  public proposition: any = {
    proposition_id: 0,
    proposition_type: '',
    proposition_type_initials: '',
    number: 0,
    year: 0,
    abstract: '',
    processing: '',
    situation: '',
    url_full: '',
    parliamentarians_approval: '',
    population_approval: '',
  }

  constructor(
    private route: ActivatedRoute,
    private requester: RequestsService,
    private token: TokenService
  ) { }

  /* T1 - AGRUPAMENTO DE INFORMAÇÕES RELACIONADAS && T2 - DECOMPOSIÇÃO DE FUNÇÕES ATÔMICAS */
  createDataList(type, options, answer) {
    var DataList;

    for(var i=0; i<options.length; i++) {
      DataList.push(this.socialInformation[type][options[i]][answer]);
    }

    return DataList;
  }

  ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);

    /* Get the proposal id passed in the route on the page before it. */
    this.sub = this.route.params.subscribe(params => {
      this.idProposition = +params['id'];
    });

    /* Get the details of a proposal according to the id. */
    this.requester.getPropositionSpecific(this.idProposition).subscribe(response => {
      this.proposition = response['body'];
    });

    /**
     * It takes the social data of the proposal and modifies the html and css of the page according
     * to the votes of the deputies present social categories.
     */
    this.requester.getPropositionSpecificSocialInfo(this.idProposition).subscribe(response => {

      this.socialInformation = response['body'];
      this.loadingStatus = false;

      /* Region. */
      /* Create data list for region [APROVE, DISAPPROVE, ABSTENTION] */
      let regionAproveDataList: any[] = this.createDataList('region', ['N', 'NE', 'CO', 'SE', 'S', 'null'], 'Y'); // T1 - AGRUPAMENTO DE INFORMAÇÕES RELACIONADAS
      let regionDisapproveDataList: any[] = this.createDataList('region', ['N', 'NE', 'CO', 'SE', 'S', 'null'],'N'); // T1 - AGRUPAMENTO DE INFORMAÇÕES RELACIONADAS
      let regionAbstentionDataList: any[] = this.createDataList('region', ['N', 'NE', 'CO', 'SE', 'S', 'null'],'A'); // T1 - AGRUPAMENTO DE INFORMAÇÕES RELACIONADAS
      /* Create chart to region */
      this.regionContext = document.getElementById('regionChart');
      this.regionChart = regionChart(regionAproveDataList, regionDisapproveDataList, regionAbstentionDataList); // T2 - DECOMPOSIÇÃO DE FUNÇÕES ATÔMICAS

      /* Income */
      /* Create data list for income [APROVE, DISAPPROVE, ABSTENTION] */
      let incomeApproveDataList: any[] = this.createDataList('income', ['A', 'B', 'C', 'D', 'E', 'null'], 'Y'); // T1 - AGRUPAMENTO DE INFORMAÇÕES RELACIONADAS
      let incomeDisapproveDataList: any[] = this.createDataList('income', ['A', 'B', 'C', 'D', 'E', 'null'], 'N'); // T1 - AGRUPAMENTO DE INFORMAÇÕES RELACIONADAS
      let incomeAbstentionDataList: any[] = this.createDataList('income', ['A', 'B', 'C', 'D', 'E', 'null'], 'A'); // T1 - AGRUPAMENTO DE INFORMAÇÕES RELACIONADAS
      /* Create chart to income */
      this.incomeContext = document.getElementById('incomeChart');
      this.incomeChart = incomeChart(incomeApproveDataList, incomeDisapproveDataList, incomeAbstentionDataList); // T2 - DECOMPOSIÇÃO DE FUNÇÕES ATÔMICAS

      /* Education. */
      /* Create data list for education [APROVE, DISAPPROVE, ABSTENTION] */
      let educationApproveDataList: any[] = this.createDataList('education', ['SE', 'EF', 'EM', 'ES', 'PG', 'null'], 'Y'); // T1 - AGRUPAMENTO DE INFORMAÇÕES RELACIONADAS
      let educationDisapproveDataList: any[] = this.createDataList('education', ['SE', 'EF', 'EM', 'ES', 'PG', 'null'], 'N'); // T1 - AGRUPAMENTO DE INFORMAÇÕES RELACIONADAS
      let educationAbstentionDataList: any[] = this.createDataList('education', ['SE', 'EF', 'EM', 'ES', 'PG', 'null'], 'A'); // T1 - AGRUPAMENTO DE INFORMAÇÕES RELACIONADAS
      /* Create chart to education */
      this.educationContext = document.getElementById('educationChart');
      this.educationChart = educationChart(educationApproveDataList, educationDisapproveDataList, educationAbstentionDataList); // T2 - DECOMPOSIÇÃO DE FUNÇÕES ATÔMICAS

      /* Race. */
      /* Create data list for race [APROVE, DISAPPROVE, ABSTENTION] */
      let raceApproveDataList: any[] = this.createDataList('race', ['B', 'PR', 'A', 'PA', 'I', 'null'], 'Y'); // T1 - AGRUPAMENTO DE INFORMAÇÕES RELACIONADAS
      let raceDisapproveDataList: any[] = this.createDataList('race', ['B', 'PR', 'A', 'PA', 'I', 'null'], 'N'); // T1 - AGRUPAMENTO DE INFORMAÇÕES RELACIONADAS
      let raceAbstentionDataList: any[] = this.createDataList('race', ['B', 'PR', 'A', 'PA', 'I', 'null'], 'A'); // T1 - AGRUPAMENTO DE INFORMAÇÕES RELACIONADAS
      /* Create chart to race */
      this.raceContext = document.getElementById('raceChart');
      this.raceChart = raceChart(raceApproveDataList, raceDisapproveDataList, raceAbstentionDataList); // T2 - DECOMPOSIÇÃO DE FUNÇÕES ATÔMICAS

      /* Gender. */
      /* Create data list for gender [APROVE, DISAPPROVE, ABSTENTION] */
      let genderApproveDataList: any[] = this.createDataList('gender', ['M', 'F', 'O', 'null'], 'Y'); // T1 - AGRUPAMENTO DE INFORMAÇÕES RELACIONADAS
      let genderDisapproveDataList: any[] = this.createDataList('gender', ['M', 'F', 'O', 'null'], 'N'); // T1 - AGRUPAMENTO DE INFORMAÇÕES RELACIONADAS
      let genderAbstentionDataList: any[] = this.createDataList('gender', ['M', 'F', 'O', 'null'], 'A'); // T1 - AGRUPAMENTO DE INFORMAÇÕES RELACIONADAS
      /* Create chart to gender */
      this.genderContext = document.getElementById('genderChart');
      this.genderChart = genderChart(genderApproveDataList, genderDisapproveDataList, genderAbstentionDataList); // T2 - DECOMPOSIÇÃO DE FUNÇÕES ATÔMICAS

      /* Parliamentarian. */
      /* Create data list for parlamentarian [APROVE, DISAPPROVE, ABSTENTION] */
      let parliamentarianDataList: any[] = [];
      parliamentarianDataList.push(this.socialInformation['parliamentarians_total_votes']['Y']);
      parliamentarianDataList.push(this.socialInformation['parliamentarians_total_votes']['N']);
      parliamentarianDataList.push(this.socialInformation['parliamentarians_total_votes']['A']);
      parliamentarianDataList.push(this.socialInformation['parliamentarians_total_votes']['others']);
      /* Create chart to parliamentarian */
      this.parliamentarianContext = document.getElementById('parliamentarianChart');
      this.parliamentarianChart = parliamentarianChart(parliamentarianDataList); // T2 - DECOMPOSIÇÃO DE FUNÇÕES ATÔMICAS

      /* Population */
      let populationDataList: any[] = [];
      populationDataList.push(this.socialInformation['population_total_votes']['Y']);
      populationDataList.push(this.socialInformation['population_total_votes']['N']);
      populationDataList.push(this.socialInformation['population_total_votes']['A']);
      /* Create chart to population */
      this.populationContext = document.getElementById('populationChart');
      this.populationChart = populationChart(populationDataList); // T2 - DECOMPOSIÇÃO DE FUNÇÕES ATÔMICAS
    });
  }

  /**
   * Responsible for detailing a proposition.
   * @param proposition_url URL of the proposal selected by the user
   */
  openProposition(proposition_url) {
    window.open(
      proposition_url,
      '_blank',
      'height=700, width=820, scrollbars=yes, status=yes'
    );
  }
}
