import { Inject, Injectable } from "@angular/core";
import { CookiesServiceController } from "./cookies.service";

@Injectable()
export class LogoutServiceController{

    constructor(@Inject(CookiesServiceController) private _cookiesService: CookiesServiceController){
    }

    logout(){
        this._cookiesService.delete_cookie("token");
        localStorage.removeItem("token");
        window.location.href = "/home";
    }

}