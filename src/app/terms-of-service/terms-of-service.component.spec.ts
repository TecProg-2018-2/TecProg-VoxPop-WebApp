import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TermsOfServiceComponent } from './terms-of-service.component';

<<<<<<< HEAD:src/app/terms-of-service/terms-of-service.component.spec.ts
describe('TermsOfServiceComponent', () => {
=======
describe('TermosDeServicoComponent', () => {
>>>>>>> 14e7d0af44a079f3e79abd6bf7a573b36510f8c8:src/app/terms-of-service/terms-of-service.component.spec.ts
  let component: TermsOfServiceComponent;
  let fixture: ComponentFixture<TermsOfServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsOfServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsOfServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
