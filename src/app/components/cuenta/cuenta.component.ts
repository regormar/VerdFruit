
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
        private _router: Router, private _logoutService:LogoutServiceController){
            if(sessionStorage.getItem("_id") == null){
                this._router.navigate(['/login']);
            }
        }

    opcion:string = "DATOS";
    idUsuario:string = "";
    usuario:Usuario = null;
    
    ngOnInit(): void {
        this.changeDatos(this.opcion);
        this.idUsuario = sessionStorage.getItem("_id");
        console.log(sessionStorage.getItem("_id"));
    }

    changeDatos(opcion:string){
        this.opcion = opcion;
        if(opcion === "DATOS"){   
            
            console.log(sessionStorage.getItem("_id"));
            let id = sessionStorage.getItem("_id");
            console.log(id);
            this._service.getUsuarioById(sessionStorage.getItem("_id"))
            .subscribe(
                (result) => {
                    if(result == null){
                        console.log("Error: no se");
                    }else{
                        console.log(result);
                        this.usuario = result;
                        console.log(this.usuario);
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