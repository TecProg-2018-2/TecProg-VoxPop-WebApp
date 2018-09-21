/***********************************************************************
  * File: how-to-use.component.ts
  * Purpose: HOw to use component class implementation.
  * Notice: All rights reserved.
  * Description File: The file is used to show how to use the service.
  ***********************************************************************/
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';

/*Component classes and its metadata.*/
@Component({
  selector: 'app-how-to-use',
  templateUrl: './how-to-use.component.html',
  styleUrls: ['./how-to-use.component.css']
})
export class HowToUseComponent implements OnInit {

  tokenValue: string = '';

  constructor(
    private token: TokenService
  ) { }
  
  /* At the beggining, get the token and check it. */
  ngOnInit() {
    this.tokenValue = this.token.getToken();
    this.token.checkToken(this.tokenValue);
  }
}
