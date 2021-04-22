import { Inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { TokenServiceController } from "./token.service";

@Injectable()
export class UserServiceController{

    ruta:string = "http://localhost:8080/VerdFruitAPI-0.0.1-SNAPSHOT/api/producto";

    constructor(private conexHttp:HttpClient, @Inject(TokenServiceController) private _tokenService: TokenServiceController) { }

    getProductos(filtro:string):Observable<any>{
        let url = this.ruta + "?filtro=" + filtro;
        return this.conexHttp.get(url, this._tokenService.generateHeaders());
    }

    getProductoById(id:string):Observable<any>{
        let url = this.ruta + "/" + id;
        return this.conexHttp.get(url, this._tokenService.generateHeaders());
    }

    getProductosByOrigen(origen:string):Observable<any>{
        let url = this.ruta + "/origen" + origen;
        return this.conexHttp.get(url, this._tokenService.generateHeaders());
    }

    getProductosByFamilia(familia:string):Observable<any>{
        let url = this.ruta + "/familia" + familia;
        return this.conexHttp.get(url, this._tokenService.generateHeaders());
    }

    getProductosByMarca(marca:string):Observable<any>{
        let url = this.ruta + "/marca" + marca;
        return this.conexHttp.get(url, this._tokenService.generateHeaders());
    }

    getProductosNuevo():Observable<any>{
        let url = this.ruta + "/inicio/nuevo";
        return this.conexHttp.get(url, this._tokenService.generateHeaders());
    }

    getProductosMasVendidos():Observable<any>{
        let url = this.ruta + "/inicio/mas_vendido";
        return this.conexHttp.get(url, this._tokenService.generateHeaders());
    }

}