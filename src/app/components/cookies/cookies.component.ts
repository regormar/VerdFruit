import { Component, OnInit } from "@angular/core";
import { CookiesServiceController } from "../../services/cookies.service";

@Component({
    selector:'cookies-component',
    templateUrl:'./cookies.component.html',
    styleUrls:['./cookies.component.css'],
    providers:[CookiesServiceController],
})

export class CookiesComponent implements OnInit{

    constructor(private _cookiesService:CookiesServiceController){

    }

    checks:boolean = true;

    ngOnInit(): void {
        if(this._cookiesService.getCookie("configured") == "true"){
            this.deleteCookieMenu();
        }else{
            var element = <HTMLElement>document.getElementById("cookies");
            element.style.visibility = "visible";
        }
    }

    acceptCookies(){ //Funcion que añade las cookies.

        this.deleteCookieMenu();  
        this._cookiesService.setCookie("configured","true"); 
    }

    deleteCookieMenu(){ //Elimina el menú de cookies
        var element = <HTMLElement>document.getElementById("cookies");
        element.style.visibility="hidden";
        element.style.opacity="0";
        this.closeConf();
    }

    seeConfig(){ //Permite mostrar el menú de configuración de las cookies
        var elementConf = <HTMLElement>document.getElementById("cookies-conf");
        elementConf.style.visibility="visible";
        elementConf.style.opacity="1";
    }

    closeConf(){ //Oculta la configuración de las cookies.
        var elementConf = <HTMLElement>document.getElementById("cookies-conf");
        elementConf.style.visibility="hidden";
        elementConf.style.opacity="0";
    }

    customCookies(){ //Comprueba si se han aceptado las cookies de terceros y las añade o no.
        if(this.checks){
            this.acceptCookies();
        } else{
            this.deleteCookieMenu();
            this._cookiesService.setCookie("configured","true"); 
        }  
    }

    // deleteCookiesDeTerceros(){ //Elimina todas las cookies.
    //     document.cookie.split(";").forEach(function(c) {
    //         document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    //     });
    // }

}