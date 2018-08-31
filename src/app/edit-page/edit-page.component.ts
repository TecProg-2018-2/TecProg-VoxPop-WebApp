import { Component, OnInit } from '@angular/core';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { Router } from '@angular/router';
import { RequestsService } from '../requests.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';
import { UserModel } from '../../models/user';
import { InputValidatorService } from '../input-validator.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})

export class EditPageComponent implements OnInit {

  tokenValue: string = '';
  userID: number = 0;

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

  updateUser() {
    const userSocialInformation = this.user.social_information;
    const user = this.user;

    if(userSocialInformation.region == 'null') {
      userSocialInformation.region = null;
    }
    if(userSocialInformation.income == 'null') {
      userSocialInformation.income = null;
    }
    if(userSocialInformation.education == 'null') {
      userSocialInformation.education = null;
    }
    if(userSocialInformation.race == 'null') {
      userSocialInformation.race = null;
    }
    if(userSocialInformation.gender == 'null') {
      userSocialInformation.gender = null;
    }
    if(user.email != '') {
      const request = this.requester.putUser(user, this.userID);
      this.updateUserHandler(request);
      return request;
    }
  }


  updateUserHandler(request) {
    request.subscribe(response => {
      const statusUser = response.status;

      if (this.requester.didSucceed(statusUser)) {
        this.router.navigate(['']);
      }
    }, error => {
      this.errorHandler(error.status);
    });
  }

  errorHandler(status: number) {
    if (status === 401) {
      document.getElementById('alert-invalid').style.display = 'block';
      return true;
    }
    if (status === 500) {
      document.getElementById('alert-invalid').style.display = 'block';
      return true;
    }
    if (status === 400) {
      document.getElementById('alert-invalid').style.display = 'block';
      return true;
    }
    return false;
  }
}
