import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RequestsService } from '../requests.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-see-compatible-parliamenterian',
  templateUrl: './see-compatible-parliamenterian.component.html',
  styleUrls: ['./see-compatible-parliamenterian.component.css']
})
export class SeeCompatibleParliamenterianComponent  implements OnInit {

  tokenValue: string = '';
  loadingStatus: boolean = true;
  mostCompatible: any[] = [];


  /* Standard method constructor for a component. */
  constructor(
    private cookieService: CookieService,
    private token: TokenService,
    private requester: RequestsService,
  ) { }

  /* Standard method of starting a component. */
  ngOnInit() {
      this.tokenValue = this.token.getToken();
      this.token.checkToken(this.tokenValue);
      this.token.filterRestrictPage(this.tokenValue);
      this.getMostCompatible();
  }

  /* Method for get a most compatible response. */
  getMostCompatible() {
      let request: any = null;
      this.mostCompatible = [];
      request =  this.requester.getMostCompatible();
      this.handleMostCompatibleResponse(request);
      return request;
  }

  /* Method for handle a most compatible response. */
  handleMostCompatibleResponse(request: any) {
    request.subscribe( response => {
        this.mostCompatible = response['body']['results'];
        this.loadingStatus = false;
    });
  }
}
