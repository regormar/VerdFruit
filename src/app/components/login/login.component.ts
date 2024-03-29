import { HttpErrorResponse, HttpEvent, HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { CookiesServiceController } from "src/app/services/cookies.service";
import { UserServiceController } from "src/app/services/user.service";
import { Token } from "../../model/token";
import { Usuario } from "../../model/usuario";

@Component({
    selector:'login-component',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css'],
    providers:[UserServiceController, CookiesServiceController],
})

export class LoginComponent implements OnInit{
    
    username!:string;
    pass!:string;
    usuario!:Usuario;
    token!: Token;
    mensaje:string = "";

    constructor(private _service:UserServiceController, private _cookieService:CookiesServiceController,
        private translate: TranslateService, private router:Router){}

    ngOnInit(): void {}

    checkLogin(){
        let exp_reg_email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{​​|}​​~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(exp_reg_email.test(this.username)){
            this._service.checkLoginEmail(this.username, this.pass)
            .subscribe(
                (result) => {                 
                    this.login(result);         
                },
                (error) => { 
                    this.resetFieldsAndShowError(error);
                }
            ); 
        }else{
            this._service.checkLoginUsername(this.username, this.pass)
            .subscribe(
                (result) => {  
                    this.login(result);           
                },
                (error) => { 
                    this.resetFieldsAndShowError(error);
                }
            ); 
        }    
    }

    resetFieldsAndShowError(error:any){
        if(error.status == 400){
            this.translate.get('INCLOGIN')
            .subscribe(
                (res: string) =>{
                    this.mensaje = res;
                }
            );
        }
        this.username = "";
        this.pass = "";
    }

    login(result:any){
        this.token = result; 
        this._cookieService.setCookie("token",this.token.key);
        localStorage.setItem("token", this.token.key);
        document.location.href = "/home";
    }
}