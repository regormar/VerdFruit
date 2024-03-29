import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class TokenServiceController{
    conexHttp: any;

    generateHeaders() {
        if (localStorage.getItem("token") && localStorage.getItem("token")!="undefined") {
        return { headers: new HttpHeaders({ 'Authorization' : <any>localStorage.getItem("token") }) };
        } else { return { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; }
    }

}