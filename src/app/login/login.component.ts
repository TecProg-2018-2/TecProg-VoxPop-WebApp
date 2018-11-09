import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/login';
import { RequestsService } from '../requests.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';
//Técnica: Código simples.

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    //Técinica: Código simples e boa apresentação
    private logging: boolean = false; //Técnica: Não deixe que os outros mexam onde não devem. Private
    private assert = require('assert'); //Técnica: Não deixe que os outros mexam onde não devem. Private

    constructor(private router: Router,
        private requester: RequestsService,
        private token: TokenService,
        private cookieService: CookieService) { }

    ngOnInit() {
        var tokenValue: string = this.token.getToken(); //Técnica: Não deixe que os outros mexam onde não devem.     
        this.assert.assert(tokenValue == null, 'Token vazio');

        this.token.checkToken(tokenValue);
        this.token.filterLoginPage(tokenValue);

        var registerSuccess: string = ''; //Técnica: Não deixe que os outros mexam onde não devem.
        registerSuccess = this.cookieService.get('success');

        this.assert.ok(registerSuccess != null);

        this.checkRegister(registerSuccess);
    }

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

    checkRegister(success) {
         //Técinica: Código simples e boa apresentação
        if (success === 'true') {
            document.getElementById('registerAlert').style.display = 'block';
            this.assert.ok(success=='true');
        }
    }

    handleLoginResponse(request) {
        request.subscribe(response => {
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
        },
            error => {
                console.log(error);
                const statusAuth = error.status;
                this.errorHandler(statusAuth);
                this.logging = false;
            });
    }

    errorHandler(status) {
        if (status === 400) {
            document.getElementById('alert-invalid').style.display = 'block';
            //Técnica: Código simples.
        }
        return; //Técnica: Equilibrar com return;
    }
}