import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Usuario } from "src/app/model/usuario";
import { UserServiceController } from "src/app/services/user.service";

@Component({
    selector:'changePassword-component',
    templateUrl:'./changePassword.component.html',
    styleUrls:['./changePassword.component.css'],
    providers:[UserServiceController],
})

export class ChangePasswordComponent{
    
    pass:string;
    verification:string;
    token:string;
    id:string;
    usuario:Usuario;

    constructor(private _service:UserServiceController, private translate: TranslateService,
        private _router: Router, private _activRoute: ActivatedRoute){}

    ngOnInit(): void {
        this._activRoute.paramMap.subscribe(
            params => {
            this.token = params.get("token");
            this.id = params.get("id");
            }
        )        
    }

    changePassword(){
        this._service.getusuarioById(parseInt(this.id), this.token)
        .subscribe(
            (res) => {
                this.usuario = res;
                this.usuario.pass = this.pass;
                this._service.changePassword(this.usuario)
                .subscribe(
                    (res) => {
                        console.log("Contraseña modificada correctamente.");
                    },
                    (err) => {
                        console.log(err)
                    }
                );              
            },
            (err) => {
                console.log(err);
            }
        );

    }

}