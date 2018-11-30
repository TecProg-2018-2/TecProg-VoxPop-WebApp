import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { EditPageComponent } from './edit-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RequestsService } from '../requests.service';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';
import { TokenService } from '../token.service';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { InputValidatorService } from '../input-validator.service';
import { LoggerService } from '@ngx-toolkit/logger';
import { ISubscription } from "rxjs/Subscription";

describe('EditPageComponent', () => {
  let component: EditPageComponent;
  let fixture: ComponentFixture<EditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        InputValidatorService
      ],
      declarations: [ EditPageComponent ],
      providers: [
        RequestsService,
        TokenService,
        CookieService,
        InputValidatorService,
        LoggerService //correção dos testes
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    
  it('should check status error', () => {
    expect(component.handleError(401)).toBeTruthy();
    expect(component.handleError(500)).toBeTruthy();
    expect(component.handleError(400)).toBeTruthy();
    expect(component.handleError(404)).toBeFalsy();
  });

  it('should not update the user', () => { // Teste realizado T32
    component.user = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      social_information: {
        region: null,
        income: null,
        education: null,
        race: null,
        gender: null,
        birth_date: null
      },
    };
    let statusCode = 1;
    let token = 'token';

    component.updateUser().unsubscribe( (resp) => {
      statusCode = resp.status;
      token = resp.body['token'];
      expect(token).toBe('token');
    });
  });

  it('should update the user', () => { // teste corrigido T32
    component.user = {
      username: 'potato',
      first_name: 'Mr Potato',
      last_name: 'Bread',
      email: 'french@fries.com',
      password: '123qwe!@#QWE',
      social_information: {
        region: null,
        income: null,
        education: null,
        race: null,
        gender: null,
        birth_date: null
      },
    };
    let statusCode = 0;
    let token = 'token';

    component.updateUser().subscribe( (resp) => {
      statusCode = resp.status;
      token = resp.body['token'];
      expect(token).not.toBe('token');
    });
  });

  it('should destroy', () => { // T32
    component.ngOnDestroy();
    expect(component.user).toBeNull();
  });
});
