import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Particular } from "src/app/model/particular";
import { UserServiceController } from "src/app/services/user.service";

@Component({
    selector:'registroParticular-component',
    templateUrl:'./registroParticular.component.html',
    styleUrls:['../registrousuario/registro.component.css'],
    providers:[UserServiceController],
})

export class RegistroParticularComponent implements OnInit{
    
    username!: string;
    pass!:string;
    verification!:string;
    email!:string;
    nombre!:string;
    apellidos!:string;
    direccion!:string;
    telefono!:string;
    tipo:number = 1;
    dni!:string;
    privacy!:boolean;
    resultado:string = "";

    constructor(private _service:UserServiceController, private translate: TranslateService){}

    ngOnInit(): void {
        let element = document.getElementById("password");
        this.translate.get('PASSREQUIREMENTS')
        .subscribe(
            (res: string) =>{
                element.setAttribute("data-title", res);
            }
        );
        let element2 = document.getElementById("username");
        this.translate.get('USERNAMEREQUIREMENTS')
        .subscribe(
            (res: string) =>{
                element2.setAttribute("data-title", res);
            }
        );
    }

    registrarUsuario(){
        this._service.postParticular(new Particular(0,this.username,this.pass,this.email,this.nombre,
            this.apellidos,this.direccion,"",this.telefono,this.tipo,this.dni))
        .subscribe(
            (result) => {  
                this.translate.get('USERADDED')
                .subscribe(
                    (res: string) =>{
                        this.resultado = result['key']; ;
                    }
                );      
            },
            (error) => { console.log(error); }
        );       
    }
}