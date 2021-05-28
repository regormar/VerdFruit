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
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { CarroComponent } from './components/carro/carro.component';
import { OrderServiceController } from './services/pedido.service';
import { ProductServiceController } from './services/producto.service';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NuevosComponent } from './components/home/nuevos/nuevos.component';
import { MasVendidosComponent } from './components/home/masVendidos/masVendidos.component';
import { RelacionadosComponent } from './components/producto/relacionados/relacionados.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Mugan86GoogleAnalyticsModule } from 'mugan86-ng-google-analytics';


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
    CuentaComponent,
    CarroComponent,
    ProductosComponent,
    ProductoComponent,
    NuevosComponent,
    MasVendidosComponent,
    RelacionadosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    Mugan86GoogleAnalyticsModule.forRoot(
      {
        analyticsId: 'G-HXL8269N1R',
        showLog: true
      }
    )
  ],
  providers: [
    TokenServiceController,
    OrderServiceController,
    ProductServiceController,
    { 
      provide: 'ORIGIN_URL', 
      useValue: location.origin 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
