import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BannerComponent } from './components/banner/banner.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TokenServiceController } from './services/token.service';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ResetPasswordComponent } from './components/resetPassword/resetPassword.component';
import { RegistroUsuarioComponent } from './components/registroUsuario/registro.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroParticularComponent } from './components/registroParticular/registroParticular.component';
import { RegistroEmpresaComponent } from './components/registroEmpresa/registroEmpresa.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { ChangePasswordComponent } from './components/changePassword/changePassword.component';

export function createTranslateLoader(http: HttpClient){
  return new TranslateHttpLoader(http, 'assets/translations/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    LoginComponent,
    BannerComponent,
    CookiesComponent,
    FooterComponent,
    HomeComponent,   
    ResetPasswordComponent,
    RegistroParticularComponent,
    RegistroEmpresaComponent,
    QuestionsComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    TokenServiceController,
    { 
      provide: 'ORIGIN_URL', 
      useValue: location.origin 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
