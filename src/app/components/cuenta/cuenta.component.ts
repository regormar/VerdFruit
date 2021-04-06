
import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CookiesServiceController } from "src/app/services/cookies.service";
import { LogoutServiceController } from "src/app/services/logout.service";
import { UserServiceController } from "src/app/services/user.service";


@Component({
    selector:'cuenta-component',
    templateUrl:'./cuenta.component.html',
    styleUrls:['./cuenta.component.css'],
    providers:[UserServiceController, CookiesServiceController, LogoutServiceController],
})


export class CuentaComponent {
    constructor(private _service:UserServiceController, private translate: TranslateService,
        private _logoutService:LogoutServiceController){}

    opcion:string = "datos";

    ngOnInit(): void {
        this.changeDatos(this.opcion);
    }

    changeDatos(opcion:string){
        this.opcion = opcion;
        var element = document.getElementById("particular");
        var element2 = document.getElementById("business");
        if(opcion === "particular"){            
            element?.classList.add("selected");
            element2?.classList.remove("selected");
        }else{
            element?.classList.remove("selected");
            element2?.classList.add("selected");
        }
    }

    logout(){
        this._logoutService.logout();
    }
    
}