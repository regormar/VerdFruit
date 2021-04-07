import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Empresa } from "src/app/model/empresa";
import { UserServiceController } from "src/app/services/user.service";

@Component({
    selector:'registroEmpresa-component',
    templateUrl:'./registroEmpresa.component.html',
    styleUrls:['../registrousuario/registro.component.css'],
    providers:[UserServiceController],
})

export class RegistroEmpresaComponent implements OnInit{
    
    username!: string;
    pass!:string;
    verification!:string;
    email!:string;
    nombre!:string;
    apellidos!:string;
    direccion!:string;
    telefono!:string;
    tipo:number = 2;   
    cif!:string;
    nombre_fiscal!:string;
    nombre_comercial!:string;
    privacy!:boolean;
    resultado:string = "";

    constructor(private _service:UserServiceController, private translate: TranslateService){}

    ngOnInit(): void {
    }

    registrarUsuario(){
        //Dvuelve que se ha insertado correctamente por el insert
        this._service.postEmpresa(new Empresa(0,this.username,this.pass,this.email,this.nombre,
            this.apellidos,this.direccion,"",this.telefono,this.tipo,this.cif,this.nombre_fiscal,this.nombre_comercial))
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