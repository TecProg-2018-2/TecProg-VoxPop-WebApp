/**********************************************************************
* File: editpage.component.ts
* Purpose: EditPageComponent class implementation
* Notice: All rights reserved.
* Description File:  Edit all current user informations
***********************************************************************/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../requests.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';
import { InputValidatorService } from '../input-validator.service';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})

/**
  *  class responsible for editing user informations
  */
export class EditPageComponent implements OnInit {

  private tokenValue: string = ''; /* Variable that storage the token of logged user*/

  private userID: number = 0;
  private assert = require('assert');



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
    public validator: InputValidatorService
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
  }

  /**
  *  Method responsible for redirect the page according
  *  the status response of user update.
  */
  updateUserHandler(request) {
    request.subscribe(response => {
      const statusUser = response.status;
      if (this.requester.didSucceed(statusUser)) {
        this.router.navigate(['']);
      } else {
        this.assert(this.requester.didSucceed(statusUser) === false, 'Não foi possível concluir a operação');
      }
    }, error => {
      this.errorHandler(error.status);
    });
  }

  /**
  *  Method responsible for showing to the user
  *  the error in editing, when the response status 401,
  *  500 or 400.
  */
  errorHandler(status: number) {
    if (status === 401 || status === 500 || status === 400) {
      document.getElementById('alert-invalid').style.display = 'block';
      return true;
    }else {
      return false;    
    }
  }
}
