 /**********************************************************************
  * File: how-to-use.component.ts
  * Purpose: HowToUseComponent class implementation
  * Notice: All rights reserved.
  * Description File: Creates the 'how to use'component to use on the help page.
  ***********************************************************************/

 import { Component, OnInit } from '@angular/core';
 import { TokenService } from '../token.service';
 import { AssertComponent } from '../../assert';

 @Component({
   selector: 'app-how-to-use',
   templateUrl: './how-to-use.component.html',
   styleUrls: ['./how-to-use.component.css']
 })
   /**
   *  Class to get token of user to use
   * the help page.
   * @class
   */
 export class HowToUseComponent implements OnInit {

   tokenValue = '';
 /**
  * Default constructor
  * @param token
  */
   constructor(private token: TokenService) { }
    /**
    * Default routine to initialize
    * component
    */
   ngOnInit() {
     /**
      * Ensure that the token exists
      */
     this.tokenValue = this.token.getToken();
     this.token.checkToken(this.tokenValue);
   }
 }
