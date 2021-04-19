import { AfterViewInit, Component, HostListener, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CookiesServiceController } from "../../services/cookies.service";
import { UserServiceController } from "../../services/user.service";
import { CarroComponent } from "../carro/carro.component";

@Component({
    selector:'banner-component',
    templateUrl:'./banner.component.html',
    styleUrls:['./banner.component.css'],
    providers:[UserServiceController, CookiesServiceController, CarroComponent],
})

export class BannerComponent implements OnInit{

    lg:string = "es";
    show:boolean = false;
    innerWidth:number;
    displayMenuReg:boolean = false;
    
    menu:boolean = true; 
    
    langs:string[]=[];

    constructor(private translate: TranslateService, 
        private _cookiesService:CookiesServiceController, private carritoComponent:CarroComponent){
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

      //Menu de usuario logeado
      if(localStorage.getItem("token") == null){
          this.menu = true;
      } else{
          this.menu = false
      }
    }

    ngOnInit(): void {
        window.dispatchEvent(new Event('resize'));
    }

    //Evento que comprueba el tamaño de la ventana y oculta o muestra el menú.
    @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.innerWidth = window.innerWidth;
      if(this.innerWidth > 1236){
        this.show = false;
        this.chargeMenu();
      }
      if(this.innerWidth<=1236){
        this.closeMenu2();
      }
      if(this.innerWidth <= 600){
        console.log("cambiando tamaño");
        let centrar = document.getElementById("centrar");
        //ERROR: AL INICIAR LA VENTANA NO MUESTRA EL VERDADERO clientHeight de "content"
        let contentHeight = document.getElementById("content").clientHeight;
        console.log(contentHeight);
        centrar.style.marginTop = contentHeight + 430 + "px";
      }
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
      this.closeCart();
      if(this.displayMenuReg === true){
        this.userMenu("none", false, "-1");
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
      this.closeCart();
      this.userMenu('none', false, '-1');
      this.show = true;
      this.chargeMenu(); 
    }

    closeMenu2(){
      if(this.innerWidth <= 1236){
        this.closeCart();
        this.userMenu('none', false, '-1');
        this.show = true;
        this.chargeMenu();
      }
    }

    closeMenu3(){
      this.closeCart();
      this.userMenu('none', false, '-1');
      if(this.innerWidth <= 1236){
        document.getElementById("menu").style.display="none";
        this.show = false;
      }
    }

    userMenu(display:string, state:boolean, z:string){
      let menuElement = document.getElementById("usuario");  
      let element = document.getElementById("centrar");    
      menuElement.style.display = display;
      element.style.zIndex = z;
      this.displayMenuReg = state;
    }

    //Función que cierra o abre el menú de identificación y cierra el de navegación si esta abierto.
    closeMenuOnOpen(){
      if(this.show === true){
        this.closeMenu2();
      }
      if(this.displayMenuReg === true){
        this.userMenu("none", false, "-1");
      }else{
        this.userMenu("flex", true, "5");
      }
    }

    //Función que abre o cierra el menu del carrito.
    cartMenu(){
      if(this.innerWidth<=1236){
        document.getElementById("menu").style.display="none";
        this.show = false;
      }
      this.carritoComponent.menuCarrito();
    }

    closeCart(){
      let show = sessionStorage.getItem('show');
      if(show == "true"){
        this.cartMenu();
      }
    }

}