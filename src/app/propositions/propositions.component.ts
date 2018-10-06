/**********************************************************************
* File: propositions.component.ts
* Purpose: PropositionsComponent class implementation
* Notice: All rights reserved.
* Description File: Creates the 'propositions' component to request all propositions.
***********************************************************************/

import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service'
import { Router } from '@angular/router';
import { PropositionModel } from '../../models/proposition'
import { VoteModel } from '../../models/vote'
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-propositions',
  templateUrl: './propositions.component.html',
  styleUrls: ['./propositions.component.css']
})
/**
 * Class to request all propositions with filter.
 * @class
 */
export class PropositionsComponent implements OnInit {

  idUser = 0;

  /**
   * Default constructor
   * @param router
   * @param requester
   * @param cookieService
   * @param token
   */
  constructor(
    private router: Router,
    private requester: RequestsService,
    private cookieService: CookieService,
    private token: TokenService
  ) { }

  /**
   * Default routine to initialize component.
   */
  idValue: number = 0;
  tokenValue: string = '';
  ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);
    this.token.filterRestrictPage(this.tokenValue);
    this.idUser = +this.cookieService.get('userID');
    this.projects();
  }

  /**
   * Makes post request to post messages.
   * @return projects
   */
  projects() {
    const requisition = this.requester.getProjects();
    this.projectsHandler(requisition);
    return requisition;
  }

  proposition: any = {
    propositionId: 0,
    propositionType: '',
    propositionTypeInitials: '',
    codeProposition: 0,
    year: 0,
    abstract: '',
    processing: '',
    situation: '',
    urlFull: '',
    parliamentariansApproval: '',
    populationApproval: '',
  }

  /**
   * Informs whether the projects request was successfully or not.
   * @param request
   */
  projectsHandler(request) {
    request.subscribe(response => {
      response['parliamentariansApproval'] = parseFloat(response['parliamentariansApproval']);
      response['populationApproval'] = parseFloat(response['populationApproval']);
      this.proposition = response['body'];
    });
  }

  /**
   * Answer a proposition, request sucessfully or not to vote.
   * @param opinion
   */
  answerPL(opinion: string) {
    var vote: VoteModel = {
      proposition: this.proposition.id,
      option: opinion
    }
    this.requester.postVote(vote).subscribe(response => {
      var status;
      status = response.status;
      /*
      * If vote is successful, the div 'votes' is shown
      */
      if (!this.requester.didSucceed(status)) {
        alert("Voto não registrado, favor tentar de novo mais tarde");
      } else {
        this.requester.getProjects().subscribe(response => {
          this.proposition = response['body'];
        });
      }
    });
  }
}
