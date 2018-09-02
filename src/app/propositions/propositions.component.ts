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
export class PropositionsComponent implements OnInit {

  constructor(
    private router: Router,
    private requester: RequestsService,
    private cookieService: CookieService,
    private token: TokenService
  ) { }

  idValue: number = 0;
  tokenValue: string = ''; 
  ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);
    this.token.filterRestrictPage(this.tokenValue);
    this.projects();
  }

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

  projectsHandler(request) {
    request.subscribe(response => {
      response['parliamentariansApproval'] = parseFloat(response['parliamentariansApproval']);
      response['populationApproval'] = parseFloat(response['populationApproval']);
      this.proposition = response['body'];
    });
  }

  answerPL(opinion: string) {
    var vote: VoteModel = {
      proposition: this.proposition.id,
      option: opinion
    }
    this.requester.postVote(vote).subscribe(response => {
      var status;
      status = response.status;
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
