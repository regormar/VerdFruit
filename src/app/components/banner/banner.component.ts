import { Component, HostListener, OnInit } from "@angular/core";
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
    show:boolean = false;
    innerWidth:number;
    displayMenuReg:boolean = false;
    
    ngOnInit(): void {
    }

    langs:string[]=[];

    //Evento que comprueba el tamaño de la ventana y oculta o muestra el menú.
    @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.innerWidth = window.innerWidth;
      if(this.innerWidth > 1236){
        this.show = false;
        this.chargeMenu();
      }
      if(this.innerWidth<=1236){
        this.show = true;
        this.chargeMenu();
      }
    }

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
      //Guardo el tamaño inicial de la ventana.
      this.innerWidth = window.innerWidth;
    }
  
    changeLang(lang:string){
      this.translate.use(lang);
      //Guardo el idioma en la cookies.
      document.cookie = "lang=" + lang;
      this._cookiesService.setCookie("lang", lang);
      //Actualizo la página para eliminar posibles textos ya traducidos mostrados a través del typescript.
      window.location.reload();
    }

    //Función para mostrar el menú u ocultarlo.
    chargeMenu(){
      if(this.displayMenuReg === true){
        this.userMenu("none", false, "4");
      }
      let element = document.getElementById("menu");
      let value = "flex";
      if(this.show){
        value = "none"; 
        this.show = false;
      }else{
        this.show = true;
      }
      element.style.display=value;
    }

    closeMenu(){
      //Si la ventana tine el tamaño en el que aparece el menú, lo oculta.
      if(this.innerWidth < 1236){
        this.show = true;
        this.chargeMenu();
      }
    }

    userMenu(display:string, state:boolean, z:string){
      let element = document.getElementById("usuario");     
      element.style.display = display;
      element.style.zIndex = z;
      this.displayMenuReg = state;
    }

    closeMenuOnOpen(){
      if(this.show === true){
        this.closeMenu();
      }
      if(this.displayMenuReg === true){
        this.userMenu("none", false, "4");
      }else{
        this.userMenu("flex", true, "5");
      }
    }

}