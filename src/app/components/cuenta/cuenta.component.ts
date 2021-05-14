
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Empresa } from "src/app/model/empresa";
import { Particular } from "src/app/model/particular";
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
        private _userService:UserServiceController, private _router: Router, private _logoutService:LogoutServiceController){
            if(localStorage.getItem("_id") == null){
                this._router.navigate(['/login']);
            }
        }

    opcion:string = "DATOS";
    idUsuario:string = "";
    tipoUsuario:number;

    usuario:Usuario = null;
    usuarioP:Particular = null;
    usuarioE:Empresa = null;
    nuevaDir:boolean = false;

    //botonEditar:string = "EDITAR";
    isDisabledUsu:boolean = true;
    editarUsu:boolean = false;
    isDisabledNombre:boolean = true;
    editarNombre:boolean = false;
    isDisabledApellidos:boolean = true;
    editarApellidos:boolean = false;

    ngOnInit(): void {
        this.changeDatos(this.opcion);
        this.idUsuario = localStorage.getItem("_id");
        console.log(localStorage.getItem("_id"));
    }

    changeDatos(opcion:string){
        this.restaurar();
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
                        if(result.tipo == 1){
                            this.usuarioP = result;
                            console.log(this.usuarioP);
                        }else if(result.tipo == 2){
                            this.usuarioE = result;
                            console.log(this.usuarioE);
                        }
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

    putUsuario(){
        if(this.usuario.tipo == 1){
            this._userService.putParticular(this.usuarioP)
            .subscribe(
                (res) => {
                },
                (err) => {
                    console.log(err);
                }
            );
        }else if(this.usuario.tipo == 2){
            this._userService.putEmpresa(this.usuarioE)
            .subscribe(
                (res) => {
                },
                (err) => {
                    console.log(err);
                }
            );
        }
        
    }

    editarUsername(){
        this.editarUsu = true;
        this.isDisabledUsu = false;
        var inputUsu = document.getElementById('inputUsu');
        inputUsu.style.borderBottom = "3px solid #989e9a";
        inputUsu.style.color = "#7e807e";
    }
    guardarUsername(){
        this.editarUsu = false;
        this.isDisabledUsu = true;
        var inputUsu = (<HTMLInputElement>document.getElementById('inputUsu'));
        inputUsu.style.border = null;
        inputUsu.style.color = null;
        if(inputUsu.value != ""){
            this.usuario.username = inputUsu.value;
            if(this.usuario.tipo == 1){
                this.usuarioP.username = inputUsu.value;
            }else if(this.usuario.tipo == 2){
                this.usuarioE.username = inputUsu.value;
            }
            inputUsu.placeholder = inputUsu.value;
            this.putUsuario();
        }
        
    }
    editarUsuNombre(){
        this.editarNombre = true;
        this.isDisabledNombre = false;
        var inputNombre = document.getElementById('inputNombre');
        inputNombre.style.borderBottom = "3px solid #989e9a";
        inputNombre.style.color = "#7e807e";
    }
    guardarUsuNombre(){
        this.editarNombre = false;
        this.isDisabledNombre = true;
        var inputNombre = (<HTMLInputElement>document.getElementById('inputNombre'));
        inputNombre.style.border = null;
        inputNombre.style.color = null;
        if(inputNombre.value != ""){
            this.usuario.nombre = inputNombre.value;
            if(this.usuario.tipo == 1){
                this.usuarioP.nombre = inputNombre.value;
            }else if(this.usuario.tipo == 2){
                this.usuarioE.nombre = inputNombre.value;
            }
            inputNombre.placeholder = inputNombre.value;
            this.putUsuario();
        }
        
    }
    editarUsuApellidos(){
        this.editarApellidos = true;
        this.isDisabledApellidos = false;
        var inputApellidos = document.getElementById('inputApellidos');
        inputApellidos.style.borderBottom = "3px solid #989e9a";
        inputApellidos.style.color = "#7e807e";
    }
    guardarUsuApellidos(){
        this.editarApellidos = false;
        this.isDisabledApellidos = true;
        var inputApellidos = (<HTMLInputElement>document.getElementById('inputApellidos'));
        inputApellidos.style.border = null;
        inputApellidos.style.color = null;
        if(inputApellidos.value != ""){
            this.usuario.apellidos = inputApellidos.value;
            if(this.usuario.tipo == 1){
                this.usuarioP.apellidos = inputApellidos.value;
            }else if(this.usuario.tipo == 2){
                this.usuarioE.apellidos = inputApellidos.value;
            }
            inputApellidos.placeholder = inputApellidos.value;
            this.putUsuario();
        }
        
    }

    restaurar(){
        this.editarUsu = false;
        this.isDisabledUsu = true;
        this.editarNombre = false;
        this.isDisabledNombre = true;
        this.editarApellidos = false;
        this.isDisabledApellidos = true;
    }
    
    eliminarDireccion(){
        
    }
}