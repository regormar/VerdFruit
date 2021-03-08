import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CookiesServiceController } from "../../services/cookies.service";
import { UserServiceController } from "../../services/user.service";

@Component({
    selector:'banner-component',
    templateUrl:'./banner.component.html',
    styleUrls:['./banner.component.css'],
    providers:[UserServiceController, CookiesServiceController],
})

export class BannerComponent implements OnInit{

    lg:string = "es";
    
    ngOnInit(): void {
    }

    langs:string[]=[];

    constructor(private translate: TranslateService,
        private _service:UserServiceController, 
        private _cookiesService:CookiesServiceController){
      this.translate.setDefaultLang('es');
      //Al iniciar el componente recuperamos el idioma de las cookies y lo aplicamos.
      this.lg = this._cookiesService.getCookie("lang");
      //En el caso de que no haya ningún idioma establecido aplicamos el siguiente:
      if(this.lg == ""){
        this.lg = "es";
      }
      this.translate.use(this.lg);
      this.translate.addLangs(['es','cat','en']);
      this.langs = this.translate.getLangs();
    }
  
    changeLang(lang:string){
      this.translate.use(lang);
      //Guardo el idioma en la cookies.
      document.cookie = "lang=" + lang;
      this._cookiesService.setCookie("lang", lang);
      //Actualizo la página para eliminar posibles textos ya traducidos mostrados a través del typescript.
      window.location.reload();
    }

}