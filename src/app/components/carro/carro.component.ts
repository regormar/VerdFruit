import { Component, Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector:'carro-component',
    templateUrl:'./carro.component.html',
    styleUrls:['./carro.component.css'],
    providers:[],
})

@Injectable()
export class CarroComponent{
    carritoOpen:boolean; 
    total:number = 10;

    constructor(){
    }

    ngOnInit(): void {
        sessionStorage.setItem('show', "false");
        
    }

    menuCarrito(){
        let show = sessionStorage.getItem('show');
        let element = document.getElementById("cartMenu");
        if(show == "true"){
            element.classList.add("inactive");
            sessionStorage.setItem('show', "false");
        }else{
            element.classList.remove("inactive"); 
            sessionStorage.setItem('show', "true");
        }

    }
}