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
import { CookieService } from 'ngx-cookie-service';

declare var Chart: any;

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
  public parliamentarianChart: any = 0 ;
  private populationContext: HTMLElement;
  public populationChart: any = 0 ;

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

      const approvalText: string = 'Porcentagem de aprovação';
      const disapprovingText: string = 'Porcentagem de desaprovação';
      const abstentionText: string = 'Porcentagem de abstenção';
      const noVoteText: string = 'Sem voto';

      this.socialInformation = response['body'];
      this.loadingStatus = false;

      /* Region chart */
      const regionLabelsList: string[] = [
        'Norte',
        'Nordeste',
        'Centro-Oeste',
        'Sudeste',
        'Sul',
        'Não informada'
      ]

      /* Region. */
      let regionAproveDataList: any[] = [];
      regionAproveDataList.push(this.socialInformation['region']['N']['Y']);
      regionAproveDataList.push(this.socialInformation['region']['NE']['Y']);
      regionAproveDataList.push(this.socialInformation['region']['CO']['Y']);
      regionAproveDataList.push(this.socialInformation['region']['SE']['Y']);
      regionAproveDataList.push(this.socialInformation['region']['S']['Y']);
      regionAproveDataList.push(this.socialInformation['region']['null']['Y']);

      let regionDisapproveDataList: any[] = [];
      regionDisapproveDataList.push(this.socialInformation['region']['N']['N']);
      regionDisapproveDataList.push(this.socialInformation['region']['NE']['N']);
      regionDisapproveDataList.push(this.socialInformation['region']['CO']['N']);
      regionDisapproveDataList.push(this.socialInformation['region']['SE']['N']);
      regionDisapproveDataList.push(this.socialInformation['region']['S']['N']);
      regionDisapproveDataList.push(this.socialInformation['region']['null']['N']);

      let regionAbstentionDataList: any[] = [];
      regionAbstentionDataList.push(this.socialInformation['region']['N']['A']);
      regionAbstentionDataList.push(this.socialInformation['region']['NE']['A']);
      regionAbstentionDataList.push(this.socialInformation['region']['CO']['A']);
      regionAbstentionDataList.push(this.socialInformation['region']['SE']['A']);
      regionAbstentionDataList.push(this.socialInformation['region']['S']['A']);
      regionAbstentionDataList.push(this.socialInformation['region']['null']['A']);

      this.regionContext = document.getElementById('regionChart');
      this.regionChart = new Chart(this.regionContext, {
        type: 'bar',
        data: {
          labels: regionLabelsList,
          datasets: [
            {
              label: approvalText,
              backgroundColor: 'rgb(68,157,68)',
              borderColor: 'rgb(255, 255, 255)',
              data: regionAproveDataList,
            },
            {
              label: disapprovingText,
              backgroundColor: 'rgb(201,48,44)',
              borderColor: 'rgb(255, 255, 255)',
              data: regionDisapproveDataList,
            },
            {
              label: abstentionText,
              backgroundColor: 'rgb(255,255,0)',
              borderColor: 'rgb(255, 255, 255)',
              data: regionAbstentionDataList,
            }
          ]
        },
        options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                  label += ': ';
                }
                label += Math.round(tooltipItem.yLabel * 100) / 100;
                return label + "%";
              }
            }
          },
          scales: {
            xAxes: [
              {
                stacked: false,
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                  min: 0,
                  autoSkip: false
                }
              }
            ]
          }
        }
      });

      /* Income chart. */
      const incomeLabelsList: string[] = [
        'Classe A',
        'Classe B',
        'Classe C',
        'Classe D',
        'Classe E',
        'Não informada'
      ]

      /* Income */
      let incomeApproveDataList: any[] = [];
      incomeApproveDataList.push(this.socialInformation['income']['A']['Y']);
      incomeApproveDataList.push(this.socialInformation['income']['B']['Y']);
      incomeApproveDataList.push(this.socialInformation['income']['C']['Y']);
      incomeApproveDataList.push(this.socialInformation['income']['D']['Y']);
      incomeApproveDataList.push(this.socialInformation['income']['E']['Y']);
      incomeApproveDataList.push(this.socialInformation['income']['null']['Y']);

      let incomeDisapproveDataList: any[] = [];
      incomeDisapproveDataList.push(this.socialInformation['income']['A']['N']);
      incomeDisapproveDataList.push(this.socialInformation['income']['B']['N']);
      incomeDisapproveDataList.push(this.socialInformation['income']['C']['N']);
      incomeDisapproveDataList.push(this.socialInformation['income']['D']['N']);
      incomeDisapproveDataList.push(this.socialInformation['income']['E']['N']);
      incomeDisapproveDataList.push(this.socialInformation['income']['null']['N']);

      let incomeAbstentionDataList: any[] = [];
      incomeAbstentionDataList.push(this.socialInformation['income']['A']['A']);
      incomeAbstentionDataList.push(this.socialInformation['income']['B']['A']);
      incomeAbstentionDataList.push(this.socialInformation['income']['C']['A']);
      incomeAbstentionDataList.push(this.socialInformation['income']['D']['A']);
      incomeAbstentionDataList.push(this.socialInformation['income']['E']['A']);
      incomeAbstentionDataList.push(this.socialInformation['income']['null']['A']);

      this.incomeContext = document.getElementById('incomeChart');
      this.incomeChart = new Chart(this.incomeContext, {
        type: 'bar',
        data: {
          labels: incomeLabelsList,
          datasets: [
            {
              label: approvalText,
              backgroundColor: 'rgb(68,157,68)',
              borderColor: 'rgb(255, 255, 255)',
              data: incomeApproveDataList,
            },
            {
              label: disapprovingText,
              backgroundColor: 'rgb(201,48,44)',
              borderColor: 'rgb(255, 255, 255)',
              data: incomeDisapproveDataList,
            },
            {
              label: abstentionText,
              backgroundColor: 'rgb(255,255,0)',
              borderColor: 'rgb(255, 255, 255)',
              data: incomeAbstentionDataList,
            }
          ]
        },
        options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                  label += ': ';
                }
                label += Math.round(tooltipItem.yLabel * 100) / 100;
                return label + "%";
              }
            }
          },
          scales: {
            xAxes: [
              {
                stacked: false,
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                  min: 0,
                  autoSkip: false
                }
              }
            ]
          }
        }
      });

      /* Education chart. */
      const educationLabelsList: string[] = [
        'Sem escolaridade',
        'Ensino Fundamental',
        'Ensino Médio',
        'Ensino Superior',
        'Pós Graduação',
        'Não informada'
      ]

      /* Education. */
      let educationApproveDataList: any[] = [];
      educationApproveDataList.push(this.socialInformation['education']['SE']['Y']);
      educationApproveDataList.push(this.socialInformation['education']['EF']['Y']);
      educationApproveDataList.push(this.socialInformation['education']['EM']['Y']);
      educationApproveDataList.push(this.socialInformation['education']['ES']['Y']);
      educationApproveDataList.push(this.socialInformation['education']['PG']['Y']);
      educationApproveDataList.push(this.socialInformation['education']['null']['Y']);

      let educationDisapproveDataList: any[] = [];
      educationDisapproveDataList.push(this.socialInformation['education']['SE']['N']);
      educationDisapproveDataList.push(this.socialInformation['education']['EF']['N']);
      educationDisapproveDataList.push(this.socialInformation['education']['EM']['N']);
      educationDisapproveDataList.push(this.socialInformation['education']['ES']['N']);
      educationDisapproveDataList.push(this.socialInformation['education']['PG']['N']);
      educationDisapproveDataList.push(this.socialInformation['education']['null']['N']);

      let educationAbstentionDataList: any[] = [];
      educationAbstentionDataList.push(this.socialInformation['education']['SE']['A']);
      educationAbstentionDataList.push(this.socialInformation['education']['EF']['A']);
      educationAbstentionDataList.push(this.socialInformation['education']['EM']['A']);
      educationAbstentionDataList.push(this.socialInformation['education']['ES']['A']);
      educationAbstentionDataList.push(this.socialInformation['education']['PG']['A']);
      educationAbstentionDataList.push(this.socialInformation['education']['null']['A']);

      this.educationContext = document.getElementById('educationChart');
      this.educationChart = new Chart(this.educationContext, {
        type: 'bar',
        data: {
          labels: educationLabelsList,
          datasets: [
            {
              label: approvalText,
              backgroundColor: 'rgb(68,157,68)',
              borderColor: 'rgb(255, 255, 255)',
              data: educationApproveDataList,
            },
            {
              label: disapprovingText,
              backgroundColor: 'rgb(201,48,44)',
              borderColor: 'rgb(255, 255, 255)',
              data: educationDisapproveDataList,
            },
            {
              label: abstentionText,
              backgroundColor: 'rgb(255,255,0)',
              borderColor: 'rgb(255, 255, 255)',
              data: educationAbstentionDataList,
            }
          ]
        },
        options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                  label += ': ';
                }
                label += Math.round(tooltipItem.yLabel * 100) / 100;
                return label + "%";
              }
            }
          },
          scales: {
            xAxes: [
              {
                stacked: false,
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                  min: 0,
                  autoSkip: false
                }
              }
            ]
          }
        }
      });

      /* Race chart. */
      const raceLabelsList: string[] = [
        'Branca',
        'Preta',
        'Amarela',
        'Parda',
        'Indígena',
        'Não informada'
      ]

      /* Race. */
      let raceApproveDataList: any[] = [];
      raceApproveDataList.push(this.socialInformation['race']['B']['Y']);
      raceApproveDataList.push(this.socialInformation['race']['PR']['Y']);
      raceApproveDataList.push(this.socialInformation['race']['A']['Y']);
      raceApproveDataList.push(this.socialInformation['race']['PA']['Y']);
      raceApproveDataList.push(this.socialInformation['race']['I']['Y']);
      raceApproveDataList.push(this.socialInformation['race']['null']['Y']);

      let raceDisapproveDataList: any[] = [];
      raceDisapproveDataList.push(this.socialInformation['race']['B']['N']);
      raceDisapproveDataList.push(this.socialInformation['race']['PR']['N']);
      raceDisapproveDataList.push(this.socialInformation['race']['A']['N']);
      raceDisapproveDataList.push(this.socialInformation['race']['PA']['N']);
      raceDisapproveDataList.push(this.socialInformation['race']['I']['N']);
      raceDisapproveDataList.push(this.socialInformation['race']['null']['N']);

      let raceAbstentionDataList: any[] = [];
      raceAbstentionDataList.push(this.socialInformation['race']['B']['A']);
      raceAbstentionDataList.push(this.socialInformation['race']['PR']['A']);
      raceAbstentionDataList.push(this.socialInformation['race']['A']['A']);
      raceAbstentionDataList.push(this.socialInformation['race']['PA']['A']);
      raceAbstentionDataList.push(this.socialInformation['race']['I']['A']);
      raceAbstentionDataList.push(this.socialInformation['race']['null']['A']);

      this.raceContext = document.getElementById('raceChart');
      this.raceChart = new Chart(this.raceContext, {
        type: 'bar',
        data: {
          labels: raceLabelsList,
          datasets: [
            {
              label: approvalText,
              backgroundColor: 'rgb(68,157,68)',
              borderColor: 'rgb(255, 255, 255)',
              data: raceApproveDataList,
            },
            {
              label: disapprovingText,
              backgroundColor: 'rgb(201,48,44)',
              borderColor: 'rgb(255, 255, 255)',
              data: raceDisapproveDataList,
            },
            {
              label: abstentionText,
              backgroundColor: 'rgb(255,255,0)',
              borderColor: 'rgb(255, 255, 255)',
              data: raceAbstentionDataList,
            }
          ]
        },
        options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                  label += ': ';
                }
                label += Math.round(tooltipItem.yLabel * 100) / 100;
                return label + "%";
              }
            }
          },
          scales: {
            xAxes: [
              {
                stacked: false,
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                  min: 0,
                  autoSkip: false
                }
              }
            ]
          }
        }
      });

      /* Gender chart. */
      const genderLabelsList: string[] = [
        'Masculino',
        'Feminino',
        'Outro',
        'Não informado'
      ]

      /* Gender. */
      let genderApproveDataList: any[] = [];
      genderApproveDataList.push(this.socialInformation['gender']['M']['Y']);
      genderApproveDataList.push(this.socialInformation['gender']['F']['Y']);
      genderApproveDataList.push(this.socialInformation['gender']['O']['Y']);
      genderApproveDataList.push(this.socialInformation['gender']['null']['Y']);

      let genderDisapproveDataList: any[] = [];
      genderDisapproveDataList.push(this.socialInformation['gender']['M']['N']);
      genderDisapproveDataList.push(this.socialInformation['gender']['F']['N']);
      genderDisapproveDataList.push(this.socialInformation['gender']['O']['N']);
      genderDisapproveDataList.push(this.socialInformation['gender']['null']['N']);

      let genderAbstentionDataList: any[] = [];
      genderAbstentionDataList.push(this.socialInformation['gender']['M']['A']);
      genderAbstentionDataList.push(this.socialInformation['gender']['F']['A']);
      genderAbstentionDataList.push(this.socialInformation['gender']['O']['A']);
      genderAbstentionDataList.push(this.socialInformation['gender']['null']['A']);

      this.genderContext = document.getElementById('genderChart');
      this.genderChart = new Chart(this.genderContext, {
        type: 'bar',
        data: {
          labels: genderLabelsList,
          datasets: [
            {
              label: approvalText,
              backgroundColor: 'rgb(68,157,68)',
              borderColor: 'rgb(255, 255, 255)',
              data: genderApproveDataList,
            },
            {
              label: disapprovingText,
              backgroundColor: 'rgb(201,48,44)',
              borderColor: 'rgb(255, 255, 255)',
              data: genderDisapproveDataList,
            },
            {
              label: abstentionText,
              backgroundColor: 'rgb(255,255,0)',
              borderColor: 'rgb(255, 255, 255)',
              data: genderAbstentionDataList,
            }
          ]
        },
        options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                  label += ': ';
                }
                label += Math.round(tooltipItem.yLabel * 100) / 100;
                return label + "%";
              }
            }
          },
          scales: {
            xAxes: [
              {
                stacked: false,
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                  min: 0,
                  autoSkip: false
                }
              }
            ]
          }
        }
      });

      /* Parliamentarian. */
      let parliamentarianDataList: any[] = [];
      parliamentarianDataList.push(this.socialInformation['parliamentarians_total_votes']['Y']);
      parliamentarianDataList.push(this.socialInformation['parliamentarians_total_votes']['N']);
      parliamentarianDataList.push(this.socialInformation['parliamentarians_total_votes']['A']);
      parliamentarianDataList.push(this.socialInformation['parliamentarians_total_votes']['others']);

      this.parliamentarianContext = document.getElementById('parliamentarianChart');
      this.parliamentarianChart = new Chart(this.parliamentarianContext, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: parliamentarianDataList,
              backgroundColor: [
                'rgb(68,157,68)',
                'rgb(201,48,44)',
                'rgb(255,255,0)',
                'rgb(115,134,213)'
              ]
            }
          ],
          labels: [
            approvalText,
            disapprovingText,
            abstentionText,
            noVoteText
          ]
        },
        options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.labels[tooltipItem.index] || '';

                if (label) {
                  label += ': ';
                }
                label += Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 100) / 100;
                return label + "%";
              }
            }
          }
        }
      });

      /* Population */
      let populationDataList: any[] = [];
      populationDataList.push(this.socialInformation['population_total_votes']['Y']);
      populationDataList.push(this.socialInformation['population_total_votes']['N']);
      populationDataList.push(this.socialInformation['population_total_votes']['A']);

      this.populationContext = document.getElementById('populationChart');
      this.populationChart = new Chart(this.populationContext, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: populationDataList,
              backgroundColor: [
                'rgb(68,157,68)',
                'rgb(201,48,44)',
                'rgb(255,255,0)'
              ]
            }
          ],
          labels: [
            approvalText,
            disapprovingText,
            abstentionText
          ]
        },
        options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.labels[tooltipItem.index] || '';

                if (label) {
                  label += ': ';
                }
                label += Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 100) / 100;
                return label + "%";
              }
            }
          }
        }
      });
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
