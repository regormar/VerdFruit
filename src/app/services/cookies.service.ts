import { Injectable } from "@angular/core";

@Injectable()
export class CookiesServiceController{

    getCookie(cname:any) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
        }
        return "";
    }

    setCookie(cname:any, cvalue:any) {
        document.cookie = cname + "=" + cvalue;
    }

    delete_cookie(cname:any) {
        document.cookie = cname +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

}