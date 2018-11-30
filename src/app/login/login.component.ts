import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/login';
import { RequestsService } from '../requests.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

/**
 * Log in to the system.
 */
export class LoginComponent implements OnInit {

    private logging: boolean = false; 
    private assert = require('assert'); 

    constructor(private router: Router,
        private requester: RequestsService,
        private token: TokenService,
        private cookieService: CookieService) { }

    /**
    * Verifies that the user is already logged in if they already have a session token.
    */
    ngOnInit() {
        var tokenValue: string = this.token.getToken(); 
        this.assert.assert(tokenValue == null, 'Token vazio');

        this.token.checkToken(tokenValue);
        this.token.filterLoginPage(tokenValue);

        var registerSuccess: string = ''; 
        registerSuccess = this.cookieService.get('success');

        this.assert.ok(registerSuccess != null);

        this.checkRegister(registerSuccess);
    }

    /**
     * Log in to the user
     * @param username 
     * @param password 
     */
    login(username: string, password: string) {
        this.logging = true;
        this.cookieService.set('success', 'false');
        let user: LoginModel;
        let req: any;
        user = {
            username: username,
            password: password
        };
        req = this.requester.postAuthentication(user);
        this.handleLoginResponse(req);
        return req;
    }

    /**
     * Checks if the person already has a record on the site, if yes the option to register is blocked.
     * @param success 
     */
    checkRegister(success) {
        if (success === 'true') {
            document.getElementById('registerAlert').style.display = 'block';
            this.assert.ok(success=='true');
        }
    }

    /**
     * Gives the appropriate treatment to the result of the request.
     * @param request 
     */
    handleLoginResponse(request) {
        request.subscribe(response => {
            this.loginSuccess(response)
        },
        error => {
            this.loginError(error)
        });
    }

    /**
     * Arrow parameter in session cookie when login is correct.
     * @param response 
     */
    loginSuccess(response: any){
        if (this.requester.didSucceed(response.status)) {

            this.assert.ok(this.requester.didSucceed(response.status)!=null);

            this.cookieService.set('basic_token', response.body['token']);
            this.cookieService.set('userID', response.body['id']);
            this.cookieService.set('userUsername', response.body['username']);
            this.cookieService.set('userFirstName', response.body['first_name']);
            this.cookieService.set('userLastName', response.body['last_name']);
            this.router.navigate(['']);
            this.logging = false;
        }
    }

    /**
     * Arrow parameter in session cookie when login is correct.
     * @param error 
     */
    loginError(error: any){
        console.log(error);
        const statusAuth = error.status;
        this.errorHandler(statusAuth);
        this.logging = false;
    }

    /**
     * Checks the status of the request.
     * @param status 
     */
    errorHandler(status) {
        if (status === 400) {
            document.getElementById('alert-invalid').style.display = 'block';
        }
        return; 
    }
}