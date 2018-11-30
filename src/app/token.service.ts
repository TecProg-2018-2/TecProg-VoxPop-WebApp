import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoggerService } from '@ngx-toolkit/logger';


@Injectable()
export class TokenService {


  private tokenValue: string = '';
  private logger: LoggerService; // Técninca: Use um sistema de logging

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
      this.logger.warn('Token Vazio!'); // Técninca: Use um sistema de logging
      return false;
    } else {
      this.logger.log('Token válido!'); // Técninca: Use um sistema de logging
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
      this.logger.warn('Token Vazio!'); // Técninca: Use um sistema de logging
      this.router.navigate(['login']);
      return true;
    } else {
      this.logger.log('Token válido!'); // Técninca: Use um sistema de logging
      // do nothing
    }
  }

  filterLoginPage(token: any) {
    if (token !== '') {
      try { // Tecnica: Tratamento de erros apropriado
        this.router.navigate(['']);
        return true;
      } catch (Error) {
        alert(Error.message); // Tecnica: Tratamento de erros apropriado
        this.logger.error(Error.message); // Técninca: Use um sistema de logging
      }
    } else {
      // Do nothing
    }
  }
}
