import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Particular } from "src/app/model/particular";
import { UserServiceController } from "src/app/services/user.service";
import { Usuario } from "../../model/usuario";

@Component({
    selector:'registroParticular-component',
    templateUrl:'./registroParticular.component.html',
    styleUrls:['./registroParticular.component.css'],
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
    tipo!:number;
    dni!:string;
    privacy!:boolean;
    resultado:string = "";

    constructor(private _service:UserServiceController, private translate: TranslateService){}

    ngOnInit(): void {
    }

    registrarUsuario(){
        //Dvuelve que se ha insertado correctamente por el insert
        this._service.postParticular(new Particular(0,this.username,this.pass,this.email,this.nombre,
            this.apellidos,this.direccion,this.telefono,this.tipo,this.dni))
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