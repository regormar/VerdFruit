import { Inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { TokenServiceController } from "./token.service";
import { Particular } from "../model/particular";
import { Empresa } from "../model/empresa";
import { Config } from "./global";

@Injectable()
export class UserServiceController{

    ruta:string = Config.BACKEND_URL + "/usuario";

    constructor(private conexHttp:HttpClient, @Inject(TokenServiceController) private _tokenService: TokenServiceController) { }

    getUsuarioById(id:string):Observable<any>{
        let url = this.ruta + "/" + id;
        return this.conexHttp.get(url, this._tokenService.generateHeaders());
    }

    postParticular(usuario:Particular):Observable<any>{
        return this.conexHttp.post(this.ruta + "/particular", usuario, this._tokenService.generateHeaders());      
    }

    postEmpresa(usuario:Empresa):Observable<any>{
        return this.conexHttp.post(this.ruta + "/empresa", usuario, this._tokenService.generateHeaders());      
    }

    checkLoginUsername(username:string, pass:string):Observable<any>{
        let url = this.ruta + "/login?username=" + username + "&pass=" + pass;
        return this.conexHttp.get(url, this._tokenService.generateHeaders());      
    }

    checkLoginEmail(email:string, pass:string):Observable<any>{
        let url = this.ruta + "/login?email=" + email + "&pass=" + pass;
        return this.conexHttp.get(url,this._tokenService.generateHeaders());      
    }

    getEmail(email:string):Observable<any>{
        let url = this.ruta + "/sendEmail/" + email;
        return this.conexHttp.get(url, this._tokenService.generateHeaders()); 
    }

    putParticular(usuario:Particular):Observable<any>{
        return this.conexHttp.put(this.ruta + "/secured/particular", usuario, this._tokenService.generateHeaders());
    }

    putEmpresa(usuario:Empresa):Observable<any>{
        console.log(usuario);
        return this.conexHttp.put(this.ruta + "/secured/empresa", usuario, this._tokenService.generateHeaders());
    }

}