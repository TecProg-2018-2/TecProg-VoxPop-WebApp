/**********************************************************************
* File: contact-us.component.ts
* Purpose: ContactUsComponent class implementation
* Notice: All rights reserved.
* Description File: Creates the 'contact us' component to make contact with the voxpop team.
***********************************************************************/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../requests.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';
import { MessageModel } from '../../models/message';
import { LoggerService } from '@ngx-toolkit/logger';

/* Component classes and its metadata. */
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

/**
 * Class to get all the information of user (token, id, information of contact)
 *  and use on the form that will be envoyed.
 * @class
 */
export class ContactUsComponent implements OnInit {

  private tokenValue = '';
  private idValue = 0;
  public input: MessageModel;
  private assert = require('assert');

/**
 * Default constructor
 * @param router
 * @param requester
 * @param cookieService
 * @param token
 */
  constructor(private router: Router,
    private requester: RequestsService,
    private cookieService: CookieService,
    private token: TokenService,
    private logger: LoggerService) { }


/**
 * Default routine to initialize component.
 */
    ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);
    this.idValue = +this.cookieService.get('userID');
    this.logger.info('PELO AMOR DE DEUS FUNCIONA ISSO');
  }

/**
 * Makes post request to post messages.
 * @return input form
 */
  postMsg() {
    const request = this.input;
    this.assert.ok(request.contactReason !== '' && request.email !== '' &&
                   request.text !== '' && request.topic !== '');
    const response = this.requester.postMessage(this.input);
    this.postMsgHandler(response);
    return request;
  }

/**
 * Informs whether the comment was posted successfully or not.
 * @param request
 */
  postMsgHandler(request) {
    request.subscribe(response => {
      const statusMsg: any = response.status;
      /*
      * If contact is successful, the div 'contactSuccess' is shown
      */
      if (this.requester.didSucceed(statusMsg)) {
        document.getElementById('contactSuccess').style.display = 'block';
      } else {
        document.getElementById('contactSuccess').style.display = 'none';
      }
    }, error => {
      this.errorHandler(error.status);
    });
  }

/**
 * Creates route to homepage for back button
 */
  backToHomepage() {
    this.router.navigate(['']);
  }
/**
 * Gives error messages linked to error status
 * @param statusRequest
 * @return the requisition status
 */
  errorHandler(statusRequest: any) {
    if (statusRequest === 401 || statusRequest === 500 || statusRequest === 400) {
      document.getElementById('contactFail').style.display = 'block';
      return true;
    } else {
      return false;
    }
  }

}
