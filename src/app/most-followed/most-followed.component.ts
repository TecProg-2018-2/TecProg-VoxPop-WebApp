import { Component, OnInit, OnDestroy } from '@angular/core';
import { TokenService } from '../token.service';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-most-followed',
  templateUrl: './most-followed.component.html',
  styleUrls: ['./most-followed.component.css']
})
export class MostFollowedComponent implements OnInit {

  public loading: boolean = true;
  logger: any;

  constructor(
    private tokenService: TokenService,
    private requestService: RequestsService,
  ) { }

  ngOnInit() {
    const tokenValue: string = this.tokenService.getToken();
    this.tokenService.checkToken(tokenValue);
    this.parliamentariansMoreOften();
  }
  /**
   * Request the API to get the statistics of the parliamentarians.
   */
  parliamentariansMoreOften() {

    try {
      const request: any = this.requestService.getMostFollowed();
      this.handleParliamentariansMoreOften(request);
    } catch (Error) {
      alert(Error.message);
    }

  }

  /**
   * Loads the HTML page object with the value received from the request.
   * @param request object that stores the result of a request
   */
  handleParliamentariansMoreOften(request) {
    try {
      request.subscribe(response => {
        const parliamentariansMoreOftenValue: any[] = response['body']['results'];
        this.loading = false;
      });
    } catch (Error) {
      alert(Error.message);
      this.logger.error(Error.message);
    }
  }

}
