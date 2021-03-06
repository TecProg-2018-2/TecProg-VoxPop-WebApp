import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, isDevMode } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { RequestsService } from './requests.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './token.service';
import { ProfileComponent } from './profile/profile.component';
import { MyPlsComponent } from './my-pls/my-pls.component';
import { PropositionsComponent } from './propositions/propositions.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ParliamentarianComponent } from './parliamentarian/parliamentarian.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { InputValidatorService } from './input-validator.service';
import { SeePlComponent } from './see-pl/see-pl.component';
import { SeePoliticianDetailedComponent } from './see-politician-detail/see-politician-detail.component';
import { UserFollowingComponent } from './user-following/user-following.component';
import { SeeCompatibleParliamenterianComponent } from './see-compatible-parliamenterian/see-compatible-parliamenterian.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PoliticaDePrivacidadeComponent } from './politica-de-privacidade/politica-de-privacidade.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { MostFollowedComponent } from './most-followed/most-followed.component';
import { PropositionComponent } from './proposition/proposition.component';
import { HowToUseComponent } from './how-to-use/how-to-use.component';
import { LoggerModule, Level } from '@ngx-toolkit/logger';
import { ToastModule } from 'ng2-toastr';


const appRoutes: Routes = [
  {
    path: 'registro',
    component: RegisterFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'proposicoes-votadas',
    component: MyPlsComponent
  },
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'perfil',
    component: ProfileComponent
  },
  {
    path: 'votar',
    component: PropositionsComponent
  },
  {
    path: 'parlamentares',
    component: ParliamentarianComponent
  },
  {
    path: 'perfil/editar',
    component: EditPageComponent
  },
  {
    path: 'proposicoes',
    component: SeePlComponent
  },
  {
    path: 'parlamentares/:id',
    component: SeePoliticianDetailedComponent
  },
  {
    path: 'parlamentares-seguidos',
    component: UserFollowingComponent
  },
  {
    path: 'ranking-de-compatibilidade',
    component: SeeCompatibleParliamenterianComponent
  },
  {
    path: 'entre-em-contato',
    component: ContactUsComponent
  },
  {
    path: 'politica-de-privacidade',
    component: PoliticaDePrivacidadeComponent
  },
  {
    path: 'termos-de-servico',
    component: TermsOfServiceComponent
  },
  {
    path: 'parlamentares-mais-seguidos',
    component: MostFollowedComponent
  },
  {
    path: 'proposicoes/:id',
    component: PropositionComponent
  },
  {
    path: 'como-utilizar',
    component: HowToUseComponent
  },
];
const LOG_LEVEL: Level = isDevMode() ? Level.INFO : Level.ERROR;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterFormComponent,
    MainPageComponent,
    LoginComponent,
    ProfileComponent,
    MyPlsComponent,
    PropositionsComponent,
    SidebarComponent,
    ParliamentarianComponent,
    EditPageComponent,
    SeePlComponent,
    SeePoliticianDetailedComponent,
    UserFollowingComponent,
    SeeCompatibleParliamenterianComponent,
    ContactUsComponent,
    PoliticaDePrivacidadeComponent,
    TermsOfServiceComponent,
    MostFollowedComponent,
    PropositionComponent,
    HowToUseComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RoundProgressModule,
    LoggerModule.forRoot(LOG_LEVEL),
    ToastModule.forRoot()
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    RequestsService,
    CookieService,
    TokenService,
    InputValidatorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
