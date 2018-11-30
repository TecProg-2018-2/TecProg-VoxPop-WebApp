/**********************************************************************
* File: contact-us.component.ts
* Purpose: ContactUsComponent class implementation
* Notice: All rights reserved.
* Description File: Creates the 'contact us' component to make contact with the voxpop team.
***********************************************************************/

import { Component, OnInit, OnDestroy, ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../requests.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';
import { MessageModel } from '../../models/message';
import { LoggerService } from '@ngx-toolkit/logger';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import {ToastsManager, Toast} from 'ng2-toastr/ng2-toastr';

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
export class ContactUsComponent implements OnInit, ErrorHandler {

  static readonly REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE: string = 'An error occurred: Please click this message to refresh';
  static readonly DEFAULT_ERROR_TITLE: string = 'Something went wrong';

  private tokenValue = '';
  private idValue = 0;
  public input = {
    topic: '',
    email: '',
    contactReason: '',
    text: ''
  };
  private assert = require('assert');

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
    private token: TokenService,
    private logger: LoggerService,
    private toastManager: ToastsManager
  ) { }


/**
 * Default routine to initialize component.
 */
    ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);
    this.idValue = +this.cookieService.get('userID');
  }

  // Paragraph for post mensage
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
      // T36
      this.showStyleSuccess(statusMsg);
    }, error => {
      this.handleError(error);
      this.logger.info('Error posting a Contact us message');
      this.logger.error(error);
    });
  }

  // T36
  showStyleSuccess(statusMsg: string) {
    /*
     * If contact is successful, the div 'contactSuccess' is shown
     */
     if (this.requester.didSucceed(statusMsg)) {
      document.getElementById('contactSuccess').style.display = 'block';
    } else {
      document.getElementById('contactSuccess').style.display = 'none';
    }
  }

  /**
   * Creates route to homepage for back button
   */
  backToHomepage() {
    this.router.navigate(['']);
  }

  // T34 e T35
  // Paragraph for handle error
  /**
   * Gives error messages linked to error status
   * @param statusRequest
   * @return the requisition status
   */
  handleError(error: any) {
    const httpErrorCode = error.status;

    switch (httpErrorCode) {
      case 401:
        document.getElementById('contactFail').style.display = 'block';
        this.router.navigateByUrl('/login');
        break;

      case 400:
        document.getElementById('contactFail').style.display = 'block';
        this.showError(ContactUsComponent.REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE);
        break;

      case 500:
        document.getElementById('contactFail').style.display = 'block';
        this.showError('Internal Server error');
        break;

      default:
        this.showError(ContactUsComponent.REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE);
    }
  }

  private showError(message: string) {
    this.toastManager.error(message, ContactUsComponent.DEFAULT_ERROR_TITLE, { dismiss: 'controlled'}).then((toast: Toast) => {
            const currentToastId: number = toast.id;
            this.toastManager.onClickToast().subscribe(clickedToast => {
                if (clickedToast.id === currentToastId) {
                    this.toastManager.dismissToast(toast);
                    window.location.reload();
                }
            });
        });
  }
}
