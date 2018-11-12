import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenService {


  private tokenValue: string = '';

  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) { }

  getToken() {
    this.tokenValue = this.cookieService.get('basic_token');
    if (this.tokenValue) {
      this.tokenValue = this.cookieService.get('bearer_token');
      if (this.tokenValue) {
        // Do nothing
      } else {
        return 'Bearer ' + this.tokenValue;
      }

    } else {
      return 'Token ' + this.tokenValue;
    }
  }

  checkToken(token: any) {
    if (token === '') {
      return false;
    } else {
      document.getElementById('register').style.display = 'none';
      document.getElementById('login').style.display = 'none';
      document.getElementById('deSuaOpiniao').style.display = 'block';
      document.getElementById('profile').style.display = 'block';
      document.getElementById('logout').style.display = 'block';
      return true;
    }
  }

  filterRestrictPage(token: any) {
    if (token === '') {
      this.router.navigate(['login']);
      return true;
    } else {
      // do nothing
    }
  }

  filterLoginPage(token: any) {
    if (token !== '') {
      this.router.navigate(['']);
      return true;
    } else {
      // Do nothing
    }
  }
}
