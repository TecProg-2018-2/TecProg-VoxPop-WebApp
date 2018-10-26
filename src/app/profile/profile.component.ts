  /**********************************************************************
  * File: profile.component.ts
  * Purpose: ProfileComponent class implementation
  * Notice: All rights reserved.
  * Description File:  Responsible for loading user data logged in.
  ***********************************************************************/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

/**
 * Loads the data of the logged in user.
 */
export class ProfileComponent implements OnInit {

  private userID: number = 0; /* logged in user id */
  public user: any = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    social_information: {
      region: null,
      income: null,
      education: null,
      race: null,
      gender: null,
      birth_date: null
    }
  };
  
  private tokenValue: string = ''; /* user session token */

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private token: TokenService,
    private requester: RequestsService
  ) { }

  /**
   * Called when the component is initialized.
   */
  ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);
    /* Filter the features that the user has access to */
    this.token.filterRestrictPage(this.tokenValue);
    this.userID = +this.cookieService.get('userID');
    /* Loads user data by id in session cookie */
    this.requester.getUser(this.userID).subscribe( response => {
      this.user = response['body'];
    }, error => {
      console.log('something wrong', error);
    });
  }

  /**
   * Directs the user to the page to edit their profile data. 
   */
  edit() {
    this.router.navigate(['perfil/editar']);
  }
}
