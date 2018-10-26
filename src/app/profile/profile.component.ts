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
export class ProfileComponent implements OnInit {

  private userID: number;
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
  private tokenValue = '';

  constructor(private router: Router,
              private cookieService: CookieService,
              private token: TokenService,
              private requester: RequestsService) { }

  ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);
    this.token.filterRestrictPage(this.tokenValue);
    this.userID = +this.cookieService.get('userID');
    this.requester.getUser(this.userID).subscribe( response => {
      this.user = response['body'];
    }, error => {
      console.log('something wrong', error);
    });
  }

  edit() {
    this.router.navigate(['perfil/editar']);
  }
}
