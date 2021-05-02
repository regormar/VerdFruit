import { Inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { TokenServiceController } from "./token.service";
import { Pedido } from "../model/pedido";
import { Config } from "./global";

@Injectable()
export class OrderServiceController{

    ruta:string = Config.BACKEND_URL + "/secured/pedido";

    constructor(private conexHttp:HttpClient, @Inject(TokenServiceController) private _tokenService: TokenServiceController) { }

    getPedidosByIdUsuario(id_usuario:string):Observable<any>{
        let url = this.ruta + "/" + id_usuario;
        return this.conexHttp.get(url, this._tokenService.generateHeaders());
    }

    getPedidosByStatus(id_usuario:string, status:number):Observable<any>{
        let url = this.ruta + "/" + id_usuario + "/" + status;
        return this.conexHttp.get(url, this._tokenService.generateHeaders());
    }

    postPedido(pedido:Pedido):Observable<any>{
        return this.conexHttp.post(this.ruta, pedido, this._tokenService.generateHeaders());      
    }

    putPedido(pedido:Pedido):Observable<any>{
        return this.conexHttp.put(this.ruta, pedido, this._tokenService.generateHeaders());      
    }

    realizarPedido(id_usuario:string, id_listaproducto:string):Observable<any>{
        let url = this.ruta + "/" + id_usuario + "/" + id_listaproducto;
        return this.conexHttp.put(url, this._tokenService.generateHeaders());      
    }

    deleteProductFromOrder(id_listaproducto:string, id_producto:number):Observable<any>{
        let url = this.ruta + "/lista/" + id_listaproducto + "/" + id_producto;
        return this.conexHttp.delete(url, this._tokenService.generateHeaders());      
    }

}