/**********************************************************************
* File: editpage.component.ts
* Purpose: EditPageComponent class implementation
* Notice: All rights reserved.
* Description File:  Edit all current user informations
***********************************************************************/
import { Component, OnInit, OnDestroy, ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../requests.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';
import { InputValidatorService } from '../input-validator.service';
import { LoggerService } from '@ngx-toolkit/logger';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import {ToastsManager, Toast} from 'ng2-toastr';
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})

/**
  *  class responsible for editing user informations
  */
export class EditPageComponent implements OnInit, OnDestroy, ErrorHandler {

  private tokenValue: string = ''; /* Variable that storage the token of logged user*/
  private userID: number = 0;
  private assert = require('assert');
  static readonly REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE: string = 'An error occurred: Please click this message to refresh';
  static readonly DEFAULT_ERROR_TITLE: string = 'Something went wrong';
  private subscription: ISubscription;
  

  user: any = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    social_information: {
        id: 0,
        owner: 0,
        region: null,
        income: null,
        education: null,
        race: null,
        gender: null,
        birth_date: null
    },
  };
  
  constructor(
    private router: Router,
    private requester: RequestsService,
    private cookieService: CookieService,
    private token: TokenService,
    public validator: InputValidatorService,
    private logger: LoggerService,
    private toastManager: ToastsManager
  ) { }

  /**
   * Standart method for initializing the
   * Angular component
   */
  ngOnInit() {
    this.tokenValue = this.token.getToken();

    this.token.checkToken(this.tokenValue);

    this.token.filterRestrictPage(this.tokenValue);

    this.userID = +this.cookieService.get('userID');

    this.requester.getUser(this.userID)
    .subscribe(
      response => {
        this.user = response['body'];
    });
  }


  /**
  *  Method responsible for update the data about user
  *  according the user social information.
  */
  updateUser() {
    const userSocialInformation = this.user.social_information;
    const user = this.user;

    if (userSocialInformation.region === 'null') {
      userSocialInformation.region = null;
    }
    if (userSocialInformation.income === 'null') {
      userSocialInformation.income = null;
    }
    if (userSocialInformation.education === 'null') {
      userSocialInformation.education = null;
    }
    if (userSocialInformation.race === 'null') {
      userSocialInformation.race = null;
    }
    if (userSocialInformation.gender === 'null') {
      userSocialInformation.gender = null;
    }
    if (user.email !== '') {
      const request = this.requester.putUser(user, this.userID);
      this.updateUserHandler(request);
      return request;
    }
    else{
      user.email = null;
    }
    this.logger.error('[ERROR] Impossible to update user. Wrong or missing statements: email ', user, user.email); // T29
  }

  /**
  *  Method responsible for redirect the page according
  *  the status response of user update.
  */
  updateUserHandler(request) {
    this.subscription = request.subscribe(response => {
      const statusUser = response.status;
      if (this.requester.didSucceed(statusUser)) {
        this.router.navigate(['']);
      } else {
        this.assert(this.requester.didSucceed(statusUser) === false, 'Não foi possível concluir a operação');
        this.logger.error('[ERROR] Impossible to update user. Wrong or missing statements. ', request); // T29
      }
    }, error => {
      this.handleError(error.status);
    }
    );
  }


  /**
  *  Method responsible for destroy (unsubscribe) the user.
  */
  ngOnDestroy() { 
    this.user.updateUser().unsubscribe();
  }

  /**
  *  Method responsible for showing to the user
  *  the error in editing, when the response status 401,
  *  500 or 400.
  */
  handleError(error: any) { 
    const httpErrorCode = error.status;
    switch (httpErrorCode) {
      case 401:
        this.showErrorAlert(); //T36
        this.router.navigateByUrl('/login');
        break;

      case 400:
        this.showErrorAlert(); //T36
        this.showError(error.message);
        break;

      case 500:
        this.showError('Internal Server error'); //T36
        break;

      default:
        this.showError(EditPageComponent.REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE);
    }
}

  /**
   * Shows an error alert message.
   */
  showErrorAlert(){ //T36 e T11
    document.getElementById('alert-invalid').style.display = 'block'; 
}

  private showError(message: string) { 
    this.toastManager.error(message, EditPageComponent.DEFAULT_ERROR_TITLE, { dismiss: 'controlled'}).then((toast: Toast) => {
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