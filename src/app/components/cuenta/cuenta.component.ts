
import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CookiesServiceController } from "src/app/services/cookies.service";
import { UserServiceController } from "src/app/services/user.service";


@Component({
    selector:'cuenta-component',
    templateUrl:'./cuenta.component.html',
    styleUrls:['./cuenta.component.css'],
    providers:[UserServiceController, CookiesServiceController],
})


export class CuentaComponent {
    constructor(private _service:UserServiceController, private translate: TranslateService){}

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
    
}