import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsComponent } from './contact-us.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RequestsService } from '../requests.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { TokenService } from '../token.service';
import { By } from 'selenium-webdriver';
import { LoggerService } from '@ngx-toolkit/logger';
import {ToastsManager, Toast, ToastOptions} from 'ng2-toastr/ng2-toastr';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ ContactUsComponent ],
      providers: [
        RequestsService,
        CookieService,
        TokenService,
        // Teste
        LoggerService,
        ToastsManager,
        ToastOptions
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should post a message', () => {
    expect(component.postMsg()).toBeDefined();
  });

  // Teste
  it('should set a error message', () => {
    expect(component.handleError(401)).toBeUndefined();
    expect(component.handleError(500)).toBeUndefined();
    expect(component.handleError(400)).toBeUndefined();
    expect(component.handleError(201)).toBeUndefined();
  });

  it('should go to back page', () => {
    expect(component.backToHomepage()).toBeUndefined();
  });

  // Teste
  it('method should be called', () => {
    spyOn(component, 'postMsg').and.returnValue(true);

    expect(component.postMsgHandler).toBeTruthy();
    expect(component.postMsg).toHaveBeenCalled();
});
});
