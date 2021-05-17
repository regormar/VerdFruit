
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
    constructor(private _service:UserServiceController, private translate: TranslateService,  private _cookieService:CookiesServiceController,
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



    isDisabledUsu:boolean = true;
    editarUsu:boolean = false;
    resultadoUsu:string = "";

    isDisabledNombre:boolean = true;
    editarNombre:boolean = false;

    isDisabledApellidos:boolean = true;
    editarApellidos:boolean = false;

    isDisabledPassword:boolean = true;
    editarPassword:boolean = false;
    resultadoPassword:string = "";

    isDisabledDNI:boolean = true;
    editarDNI:boolean = false;
    resultadoDNI:string = "";

    isDisabledCIF  = true;
    editarCIF = false;
    resultadoCIF:string = "";

    isDisabledFiscal = true;
    editarFiscal = false;
    resultadoFiscal:string = "";

    isDisabledComercial = true;
    editarComercial = false;
    resultadoComercial:string = "";

    isDisabledCorreo:boolean = true;
    editarCorreo:boolean = false;
    resultadoCorreo:string = "";

    isDisabledTelefono:boolean = true;
    editarTelefono:boolean = false;
    resultadoTelefono:string = "";

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
            console.log("usuario P:" +this.usuarioP);
            this._userService.putParticular(this.usuarioP)
            .subscribe(
                (res) => {
                    console.log(res);
                },
                (err) => {
                    console.log(err);
                }
            );
        }else if(this.usuario.tipo == 2){
            console.log("usuario EEEEE:" +this.usuarioE);
            this._userService.putEmpresa(this.usuarioE)
            .subscribe(
                (res) => {
                    console.log(res);
                },
                (err) => {
                    console.log(err);
                }
            );
        }
        
    }

    /*
    editarDatos(variable:string){
        console.log(variable);
        if(variable == "username"){
            console.log("hola");
            this.editarUsu = true;
            this.isDisabledUsu = false;
            var inputUsu = document.getElementById('inputUsername');
            console.log("hola 2");
        }else if(variable == "nombre"){

        }else if(variable == "apellidos"){

        }
        inputUsu.style.borderBottom = "3px solid #989e9a";
        inputUsu.style.color = "#7e807e";
    }
    
    guardarDatos(variable:string){
        var variableCambios, variableCambios2;
        if(variable == "username"){
            console.log("hola3");
            this.editarUsu = false;
            this.isDisabledUsu = true;
            var inputUsu = (<HTMLInputElement>document.getElementById('inputUsername'));
            variableCambios = this.usuario.username;
            console.log(variableCambios);
            if(this.usuario.tipo == 1){
                variableCambios2 = this.usuarioP.username;
            }else if(this.usuario.tipo == 2){
                variableCambios2 = this.usuarioE.username;
            }
            console.log("hola 4");
        }else if(variable == "nombre"){
            
        }else if(variable == "apellidos"){

        }
        inputUsu.style.border = null;
        inputUsu.style.color = null;
        if(inputUsu.value != ""){
            variableCambios = inputUsu.value;
            variableCambios2 = inputUsu.value;
            console.log(variableCambios);
            console.log(variableCambios2);
            inputUsu.placeholder = inputUsu.value;
            
            if(variable == "username"){
                if(this.usuario.tipo == 1){
                    this.usuarioP.username = variableCambios2;
                }else if(this.usuario.tipo == 2){
                    this.usuarioE.username = variableCambios2;
                }
            }else if(variable == "nombre"){
                if(this.usuario.tipo == 1){
                    this.usuarioP.nombre = variableCambios2;
                }else if(this.usuario.tipo == 2){
                    this.usuarioE.nombre = variableCambios2;
                }
            }

            console.log(this.usuarioP);
            this.putUsuario();
            console.log("hola 5");
        }
    }
    */

    editarUsername(){
        this.editarUsu = true;
        this.isDisabledUsu = false;
        this.resultadoUsu = "";
        var inputUsu = document.getElementById('inputUsername');
        inputUsu.style.borderBottom = "3px solid #989e9a";
        inputUsu.style.color = "#7e807e";
    }
    guardarUsername(){
        this.editarUsu = false;
        this.isDisabledUsu = true;
        var inputUsu = (<HTMLInputElement>document.getElementById('inputUsername'));
        inputUsu.style.border = null;
        inputUsu.style.color = null;
        if(inputUsu.value != ""){
            let exp_username = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
            if(exp_username.test(inputUsu.value)){
                this.usuario.username = inputUsu.value;
                if(this.usuario.tipo == 1){
                    this.usuarioP.username = inputUsu.value;
                }else if(this.usuario.tipo == 2){
                    this.usuarioE.username = inputUsu.value;
                }
                inputUsu.placeholder = inputUsu.value;
                this.putUsuario();
                setTimeout(() => {
                    this.checkLogin();
                }, 15000);
            }else{
                this.resultadoUsu = "USERNAMEREQUIREMENTS";
                setTimeout(() => {
                    this.resultadoUsu = "";
                }, 3000);
                inputUsu.value =  this.usuario.username;
            }
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

    
    editarPass(){
        this.editarPassword = true;
        this.isDisabledPassword = false;
        this.resultadoPassword = "";
        var inputPassword = (<HTMLInputElement>document.getElementById('inputPassword'));
        inputPassword.style.borderBottom = "3px solid #989e9a";
        inputPassword.style.color = "#7e807e";
        inputPassword.placeholder = "Contraseña Actual";
        var inputPassword1 = (<HTMLInputElement>document.getElementById('inputPassword1'));
        inputPassword1.style.borderBottom = "3px solid #989e9a";
        inputPassword1.style.color = "#7e807e";
        var inputPassword2 = (<HTMLInputElement>document.getElementById('inputPassword2'));
        inputPassword2.style.borderBottom = "3px solid #989e9a";
        inputPassword2.style.color = "#7e807e";
    }
    guardarPass(){
        this.editarPassword = false;
        this.isDisabledPassword = true;
        var inputPassword = (<HTMLInputElement>document.getElementById('inputPassword'));
        inputPassword.style.border = null;
        inputPassword.style.color = null;
        var inputPassword1 = (<HTMLInputElement>document.getElementById('inputPassword1'));
        inputPassword1.style.border = null;
        inputPassword1.style.color = null;
        var inputPassword2 = (<HTMLInputElement>document.getElementById('inputPassword2'));
        inputPassword2.style.border = null;
        inputPassword2.style.color = null;
        if(inputPassword.value != ""){
            let exp_pass = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
            if(exp_pass.test(inputPassword.value)){
                if(inputPassword.value === this.usuario.pass){
                    if(exp_pass.test(inputPassword1.value)){
                        if(exp_pass.test(inputPassword2.value)){
                            if(inputPassword1.value === inputPassword2.value){
                                this.usuario.pass = inputPassword1.value;
                                if(this.usuario.tipo == 1){
                                    this.usuarioP.pass = inputPassword1.value;
                                }else if(this.usuario.tipo == 2){
                                    this.usuarioE.pass = inputPassword1.value;
                                }
                                inputPassword1.placeholder = inputPassword1.value;
                                this.putUsuario();
                                setTimeout(() => {
                                    this.checkLogin();
                                }, 15000);
                            }else{
                                this.resultadoPassword = "Las contraseña no son iguales.";
                            }
                        }else{
                            this.resultadoPassword = "PASSREQUIREMENTS3";
                        }
                    }else{
                        this.resultadoPassword = "PASSREQUIREMENTS2";
                    }
                }else{
                    this.resultadoPassword = "La contraseña es incorrecta.";
                }
            }else{
                this.resultadoPassword = "PASSREQUIREMENTS1";
            }
            
            setTimeout(() => {
                this.resultadoPassword = "";
            }, 3000);
        }
        
    }

    editarDni(){
        this.editarDNI = true;
        this.isDisabledDNI = false;
        this.resultadoDNI = "";
        var inputDNI = document.getElementById('inputDNI');
        inputDNI.style.borderBottom = "3px solid #989e9a";
        inputDNI.style.color = "#7e807e";
    }
    guardarDni(){
        this.editarDNI = false;
        this.isDisabledDNI = true;
        var inputDNI = (<HTMLInputElement>document.getElementById('inputDNI'));
        inputDNI.style.border = null;
        inputDNI.style.color = null;
        if(inputDNI.value != ""){
            let exp_DNI= /[0-9]{8}[A-Za-z]{1}/;
            if(exp_DNI.test(inputDNI.value)){
                console.log(inputDNI.value);
                this.usuarioP.dni = inputDNI.value;
                inputDNI.placeholder = inputDNI.value;
                this.putUsuario();
            }else{
                this.resultadoDNI = "DNI_INVALIDO";
                setTimeout(() => {
                    this.resultadoDNI = "";
                }, 3000);
                inputDNI.value =  this.usuarioP.dni;
            }
        }
        
    }

    editarCif(){
        this.editarCIF = true;
        this.isDisabledCIF = false;
        this.resultadoCIF= "";
        var inputCIF = document.getElementById('inputCIF');
        inputCIF.style.borderBottom = "3px solid #989e9a";
        inputCIF.style.color = "#7e807e";
    }
    guardarCif(){
        this.editarCIF = false;
        this.isDisabledCIF = true;
        var inputCIF = (<HTMLInputElement>document.getElementById('inputCIF'));
        inputCIF.style.border = null;
        inputCIF.style.color = null;
        if(inputCIF.value != ""){
            let exp_CIF= /[A-Za-z]{1}[0-9]{8}/;
            if(exp_CIF.test(inputCIF.value)){
                console.log(inputCIF.value);
                this.usuarioE.cif = inputCIF.value;
                inputCIF.placeholder = inputCIF.value;
                this.putUsuario();
                console.log("todo bien:"+inputCIF.value);
            }else{
                this.resultadoCIF = "CIF_INVALIDO";
                setTimeout(() => {
                    this.resultadoCIF = "";
                }, 3000);
                inputCIF.value =  this.usuarioE.cif;
            }
        }
        
    }

    editarNombreFiscal(){
        this.editarFiscal = true;
        this.isDisabledFiscal = false;
        var inputFiscal = document.getElementById('inputFiscal');
        inputFiscal.style.borderBottom = "3px solid #989e9a";
        inputFiscal.style.color = "#7e807e";
    }
    guardarNombreFiscal(){
        this.editarFiscal = false;
        this.isDisabledFiscal = true;
        var inputFiscal = (<HTMLInputElement>document.getElementById('inputFiscal'));
        inputFiscal.style.border = null;
        inputFiscal.style.color = null;
        if(inputFiscal.value != ""){
            console.log(inputFiscal.value);
            this.usuarioE.nombre_fiscal = inputFiscal.value;
            inputFiscal.placeholder = inputFiscal.value;
            this.putUsuario();
            console.log("todo bien:"+inputFiscal.value);
            inputFiscal.value =  this.usuarioE.nombre_fiscal;
        }
        
    }

    editarNombreComercial(){
        this.editarComercial = true;
        this.isDisabledComercial = false;
        var inputComercial = document.getElementById('inputComercial');
        inputComercial.style.borderBottom = "3px solid #989e9a";
        inputComercial.style.color = "#7e807e";
    }
    guardarNombreComercial(){
        this.editarComercial = false;
        this.isDisabledComercial = true;
        var inputComercial = (<HTMLInputElement>document.getElementById('inputComercial'));
        inputComercial.style.border = null;
        inputComercial.style.color = null;
        if(inputComercial.value != ""){
            console.log(inputComercial.value);
            this.usuarioE.nombre_comercial = inputComercial.value;
            inputComercial.placeholder = inputComercial.value;
            this.putUsuario();
            console.log("todo bien:"+inputComercial.value);
            inputComercial.value =  this.usuarioE.nombre_comercial;
        }
        
    }

    editarEmail(){
        this.editarCorreo = true;
        this.isDisabledCorreo = false;
        this.resultadoCorreo = "";
        var inputCorreo = document.getElementById('inputCorreo');
        inputCorreo.style.borderBottom = "3px solid #989e9a";
        inputCorreo.style.color = "#7e807e";
    }
    guardarEmail(){
        this.editarCorreo = false;
        this.isDisabledCorreo = true;
        var inputCorreo = (<HTMLInputElement>document.getElementById('inputCorreo'));
        inputCorreo.style.border = null;
        inputCorreo.style.color = null;
        if(inputCorreo.value != ""){
            let exp_email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            if(exp_email.test(inputCorreo.value)){
                this.usuario.email = inputCorreo.value;
                if(this.usuario.tipo == 1){
                    this.usuarioP.email = inputCorreo.value;
                }else if(this.usuario.tipo == 2){
                    this.usuarioE.email = inputCorreo.value;
                }
                inputCorreo.placeholder = inputCorreo.value;
                this.putUsuario();
            }else{
                this.resultadoCorreo = "EMAILINVALIDO";
                setTimeout(() => {
                    this.resultadoCorreo = "";
                }, 3000);
                inputCorreo.value =  this.usuario.email;
            }
        }
        
    }

    editarTel(){
        this.editarTelefono = true;
        this.isDisabledTelefono = false;
        this.resultadoTelefono = "";
        var inputTelefono = document.getElementById('inputTelefono');
        inputTelefono.style.borderBottom = "3px solid #989e9a";
        inputTelefono.style.color = "#7e807e";
    }
    guardarTel(){
        this.editarTelefono = false;
        this.isDisabledTelefono = true;
        var inputTelefono = (<HTMLInputElement>document.getElementById('inputTelefono'));
        inputTelefono.style.border = null;
        inputTelefono.style.color = null;
        if(inputTelefono.value != ""){
            let exp_telefono = /[0-9]{9}/;
            if(exp_telefono.test(inputTelefono.value)){
                this.usuario.telefono = inputTelefono.value;
                if(this.usuario.tipo == 1){
                    this.usuarioP.telefono = inputTelefono.value;
                }else if(this.usuario.tipo == 2){
                    this.usuarioE.telefono = inputTelefono.value;
                }
                inputTelefono.placeholder = inputTelefono.value;
                this.putUsuario();
            }else{
                this.resultadoTelefono = "TELEFONOINVALIDO";
                setTimeout(() => {
                    this.resultadoTelefono = "";
                }, 3000);
                inputTelefono.value =  this.usuario.telefono;
            }
        }
        
    }

    restaurar(){
        this.editarUsu = false;
        this.isDisabledUsu = true;

        this.editarNombre = false;
        this.isDisabledNombre = true;

        this.editarApellidos = false;
        this.isDisabledApellidos = true;

        this.editarDNI = false;
        this.isDisabledDNI = true;

        this.editarCIF = false;
        this.isDisabledCIF  = true;

        this.editarFiscal = false;
        this.isDisabledFiscal = true;

        this.editarComercial = false;
        this.isDisabledComercial = true;

        this.editarCorreo = false;
        this.isDisabledCorreo = true;

        this.editarTelefono = false;
        this.isDisabledTelefono = true;
    }
    
    eliminarDireccion(){
        
    }

    checkLogin(){
        this._service.checkLoginUsername(this.usuario.username, this.usuario.pass)
        .subscribe(
            (result) => {  
                this.login(result);           
            },
            (error) => { 
                console.log(error);
            }
        );  
    }

    login(result:any){
        this._cookieService.setCookie("token",result.token);
        localStorage.setItem("token", result.token);
        localStorage.setItem("_id", result.id);
        document.location.href = "/cuenta";
    }

}