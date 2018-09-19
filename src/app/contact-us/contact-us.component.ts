import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../requests.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';

/* Component classes and its metadata. */
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

/* Responsible class for form to contact. */
export class ContactUsComponent implements OnInit {

  tokenValue: string = '';
  idValue: number = 0;
  input = {
    topic: '',
    email: '',
    contactReason: '',
    text: ''
  };

  constructor(private router: Router,
    private requester: RequestsService,
    private cookieService: CookieService,
    private token: TokenService) { }

  /* Default routine to initialize component. */
  ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);
    this.idValue = +this.cookieService.get('userID');
  }
  
  /* Method to post a message from the input in another iframe. */
  postMsg() {
    const request = this.input;
    const response = this.requester.postMessage(this.input);
    this.postMsgHandler(response);
    return request;
  }

  /* Method to verify if the message was sucessfully posted. */
  postMsgHandler(request) {
    request.subscribe(response => {
      const statusMsg: any = response.status;
      if (this.requester.didSucceed(statusMsg)) {
        document.getElementById('contactSuccess').style.display = 'block';
      }
    }, error => {
      this.errorHandler(error.status);
    });
  }

  /* Method to back to Homepage. */
  backToHomepage() {
    this.router.navigate(['']);
  }

  /* Method to display if the requisition to send a message goes wrong. */
  errorHandler(statusRequest: any) {
    if (statusRequest === 401) {
      document.getElementById('contactFail').style.display = 'block';
      return true;
    }
    if (statusRequest === 500) {
      document.getElementById('contactFail').style.display = 'block';
      return true;
    }
    if (statusRequest === 400) {
      document.getElementById('contactFail').style.display = 'block';
      return true;
    }
    return false;
  }

}