import { Inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { TokenServiceController } from "./token.service";
import { Pedido } from "../model/pedido";

@Injectable()
export class UserServiceController{

    ruta:string = "http://localhost:8080/VerdFruitAPI-0.0.1-SNAPSHOT/api/pedido";

    constructor(private conexHttp:HttpClient, @Inject(TokenServiceController) private _tokenService: TokenServiceController) { }

    getPedidoByIdUsuario(id:string):Observable<any>{
        let url = this.ruta + "/" + id;
        return this.conexHttp.get(url, this._tokenService.generateHeaders());
    }

    postPedido(pedido:Pedido):Observable<any>{
        return this.conexHttp.post(this.ruta, pedido, this._tokenService.generateHeaders());      
    }

}