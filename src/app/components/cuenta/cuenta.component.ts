
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
            if(localStorage.getItem("_id") == null){
                this._router.navigate(['/login']);
            }
        }

    opcion:string = "DATOS";
    idUsuario:string = "";
    usuario:Usuario = null;
    
    ngOnInit(): void {
        this.changeDatos(this.opcion);
        this.idUsuario = localStorage.getItem("_id");
        console.log(localStorage.getItem("_id"));
    }

    changeDatos(opcion:string){
        this.opcion = opcion;
        if(opcion === "DATOS"){   
            
            console.log(localStorage.getItem("_id"));
            let id = localStorage.getItem("_id");
            console.log(id);
            this._service.getUsuarioById(localStorage.getItem("_id"))
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