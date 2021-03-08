import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/model/usuario";
import { UserServiceController } from "../../services/user.service";

@Component({
    selector:'usuario-component',
    templateUrl:'./usuario.component.html',
    providers:[UserServiceController],
})

export class UsuarioComponent implements OnInit{

    usuario!:Usuario;

    constructor(private _service:UserServiceController){}

    ngOnInit(): void {
        this._service.getusuarioById(1)
        .subscribe(
            (result) => {  
                this.usuario = result;
            },
            (error) => { console.log(error); }
        );       
    }


}