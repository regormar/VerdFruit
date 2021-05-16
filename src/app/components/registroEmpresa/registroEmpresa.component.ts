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
    errorMsg:string = "";

    constructor(private _service:UserServiceController, private translate: TranslateService){}

    ngOnInit(): void {
        let element = document.getElementById("password");
        console.log(element);
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
        //Dvuelve que se ha insertado correctamente por el insert
        this._service.postEmpresa(new Empresa(0,this.username,this.pass,this.email,this.nombre,
            this.apellidos,this.direccion,"",this.telefono,this.tipo,this.cif,this.nombre_fiscal,this.nombre_comercial))
        .subscribe(
            (result) => {  
                this.translate.get('USERADDED')
                .subscribe(
                    (res: string) =>{
                        this.resultado = res;
                    }
                );      
            },
            (error) => { 
                var errorMsg = "";
                switch(error.error){
                    case "< Ya existe un usuario con este correo >":
                        errorMsg = "EMAILEXISTS"
                        break;
                    case "< Ya existe una empresa con este CIF >":
                        errorMsg = "CIFEXISTS";
                        break;
                    case "< Este nombre de usuario ya existe >":
                        errorMsg = "USERNAMEXISTS";
                        break;
                    default:
                        errorMsg = "ERROR";
                }
                this.translate.get(errorMsg)
                .subscribe(
                    (res: string) =>{
                        this.errorMsg = res;
                    }
                );  
            }
        );       
    }
}