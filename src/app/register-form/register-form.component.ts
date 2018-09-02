import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../requests.service';
import { InputValidatorService } from '../input-validator.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
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

  constructor(
    private router: Router,
    private requester: RequestsService,
    private validator: InputValidatorService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }

  registerUser() {
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
    requisition = this.requester.postUser(this.user);
    this.registerUserHandler(requisition);
    return requisition;
  }

  registerUserHandler(request) {
    request.subscribe(response => {
      const statusUser = response.status;
      if (this.requester.didSucceed(statusUser)) {
        this.router.navigate(['login']);
        this.cookieService.set('success', 'true');
      }
    }, error => {
      const statusAuth = error.status;
      this.validator.errorHandler(statusAuth);
    });
  }
}
