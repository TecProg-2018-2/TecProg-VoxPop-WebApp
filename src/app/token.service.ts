import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenService {

  tokenValue = '';

  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) { }

  // T34 e T35
  // Paragraph for token
  getToken() {
    this.tokenValue = this.cookieService.get('basic_token');
    if (this.tokenValue !== '') {
      return 'Token ' + this.tokenValue;
    } else {
      this.tokenValue = this.cookieService.get('bearer_token');
      if (this.tokenValue !== '') {
        return 'Bearer ' + this.tokenValue;
      }
    }
    return '';
  }

  checkToken(token: any) {
    if (token === '') {
      return false;
    } else {
      // T36
      this.modifyStyle();
      return true;
    }
  }

  // T34 e T35
  // Paragraph for styles
  // T36
  modifyStyle() {
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('deSuaOpiniao').style.display = 'block';
    document.getElementById('profile').style.display = 'block';
    document.getElementById('logout').style.display = 'block';
  }


  // T34 e T35
  // Paragraph to filter page
  filterRestrictPage(token: any) {
    if (token === '') {
      this.router.navigate(['login']);
      return true;
    }
  }

  filterLoginPage(token: any) {
    if (token !== '') {
      this.router.navigate(['']);
      return true;
    }
  }
}
