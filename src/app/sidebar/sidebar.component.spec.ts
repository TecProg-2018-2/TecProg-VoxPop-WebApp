import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { CookieService } from 'ngx-cookie-service';
import { By } from 'selenium-webdriver';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      providers: [
        CookieService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should active sidebar', () => {
    const sidebar = 'false';
    component.setSidebar(sidebar);
    expect(component).toBeTruthy();
  });

  // T36
  it('Should show options when toggle option is clicked', fakeAsync(() => {
    fixture.detectChanges();
    const toggleButton = fixture.debugElement.nativeElement(By.css('[sidebar]'));
    toggleButton[0].nativeElement.click();
    tick();
    fixture.detectChanges();
    const list = fixture.debugElement.nativeElement(By.css('active'));
    console.log(list[0]);
}));

});
