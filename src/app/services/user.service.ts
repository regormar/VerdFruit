import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { TokenServiceController } from "./token.service";
import { Particular } from "../model/particular";
import { Empresa } from "../model/empresa";
import { Usuario } from "../model/usuario";

@Injectable()
export class UserServiceController{

    ruta:string = "http://localhost:8080/VerdFruitAPI-0.0.1-SNAPSHOT/api/usuario";

    constructor(private conexHttp:HttpClient, @Inject(TokenServiceController) private _tokenService: TokenServiceController) { }

    getUsuarioById(id:number,token:string):Observable<any>{
        console.log(token);
        let url = this.ruta + "/secured/" + id;
        return this.conexHttp.get(url, { headers: new HttpHeaders({ 'Authorization' : "Basic "+token }) });
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
        let url = this.ruta + "?key=" + email;
        return this.conexHttp.get(url, this._tokenService.generateHeaders()); 
    }

    changePassword(usuario:Usuario, token:string):Observable<any>{
        return this.conexHttp.put(this.ruta + "/password/"+token, usuario, this._tokenService.generateHeaders());
    }

}