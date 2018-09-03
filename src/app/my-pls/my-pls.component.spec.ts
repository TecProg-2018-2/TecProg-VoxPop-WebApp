import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPlsComponent } from './my-pls.component';
import { RequestsService } from '../requests.service';
import { HttpClientModule } from '@angular/common/http';
import { TokenService } from '../token.service';
import { CookieService } from 'ngx-cookie-service';

describe('MyPlsComponent', () => {
  let component: MyPlsComponent;
  let fixture: ComponentFixture<MyPlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [MyPlsComponent],
      providers: [
        CookieService,
        RequestsService,
        CookieService,
        TokenService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change variable on click', () => {
    component.specifyProposition(42, false);
    expect(component.votePosition).toBe(42);
  });

});
