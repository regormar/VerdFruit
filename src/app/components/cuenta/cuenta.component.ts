
import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Usuario } from "src/app/model/usuario";
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

    opcion:string = "DATOS";
    idUsuario:string = "";
    usuario:Usuario;
    
    ngOnInit(): void {
        this.changeDatos(this.opcion);
        this.idUsuario = sessionStorage.getItem("_id");
        console.log(sessionStorage.getItem("_id"));
    }2

    changeDatos(opcion:string){
        this.opcion = opcion;
        if(opcion === "DATOS"){   
            
            console.log(sessionStorage.getItem("_id"));
            let id = sessionStorage.getItem("_id");
            console.log(id);
            this._service.getUsuarioById(sessionStorage.getItem("_id"))
            .subscribe(
                (result) => {
                    console.log(result);
                    if(result = 200){
                        this.usuario = result;
                        console.log(this.usuario);
                    }else{
                        console.log("Error: no se");
                    }
                    
                },
                (error) => { 
                    console.log(error);
                }
            );
        }
    }

    logout(){
        this._logoutService.logout();
    }
    
}