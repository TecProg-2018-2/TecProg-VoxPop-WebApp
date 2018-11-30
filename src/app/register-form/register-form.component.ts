/**********************************************************************
* File: register-form.component.ts
* Purpose: RegisterFormComponent class implementation
* Notice: All rights reserved.
* Description File: Creates the 'register form' component to make form to register user.
***********************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../requests.service';
import { UserModel } from '../../models/user';
import { SocialInformationModel } from '../../models/socialInformation'
import { and } from '@angular/router/src/utils/collection';
import { InputValidatorService } from '../input-validator.service';
import { CookieService } from 'ngx-cookie-service';
import { AssertComponent } from '../../assert';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
/**
 * Class to register a user.
 * @class
 */
export class RegisterFormComponent implements OnInit {

  assert = require('assert');

  /**
   * Default constructor
   * @param router
   * @param requester
   * @param cookieService
   * @param validator
   */
  constructor(private router: Router,
    private requester: RequestsService,
    private validator: InputValidatorService,
    private cookieService: CookieService
  ) { }

  /**
   * Default routine to initialize component.
   */
  ngOnInit() { }

  user: any = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    socialInformation: {
      region: null,
      income: null,
      education: null,
      race: null,
      gender: null,
      birthDate: null
    }
  };

  /**
   * Makes post request to post user.
   * @return post user
   */
  registerUser() {
    /*
     * Init all informations of user with null value.
     */
    if (this.user.socialInformation.region == 'null') {
      this.user.socialInformation.region = null;
    }
    if (this.user.socialInformation.income == 'null') {
      this.user.socialInformation.income = null;
    }
    if (this.user.socialInformation.education == 'null') {
      this.user.socialInformation.education = null;
    }
    if (this.user.socialInformation.race == 'null') {
      this.user.socialInformation.race = null;
    }
    if (this.user.socialInformation.gender == 'null') {
      this.user.socialInformation.gender = null;
    }
    let requisition;
    this.assert.notEqual(this.user, 'null' || 'undefined');
    requisition = this.requester.postUser(this.user);
    this.registerUserHandler(requisition);
    return requisition;
  }

  /**
   * Informs whether the user was posted successfully or not.
   * @param request
   */
  registerUserHandler(request) {
    this.assert.notEqual(request, 'null' || 'undefined');
    request.subscribe(response => {
      const statusUser = response.status;
      /*
      * If request is successful, the route navigate to login and cookie set true login
      */
      if (this.requester.didSucceed(statusUser)) {
        this.router.navigate(['login']);
        this.cookieService.set('success', 'true');
      }
    },
      error => {
        const statusAuth = error.status;
        this.validator.handleError(statusAuth);
      });
  }
}
