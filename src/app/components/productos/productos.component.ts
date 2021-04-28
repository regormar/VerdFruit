import { Component, OnInit } from "@angular/core";
import { UserServiceController } from "src/app/services/user.service";

@Component({
    selector:'productos-component',
    templateUrl:'./productos.component.html',
    styleUrls:['./productos.component.css'],
    providers:[],
})

export class ProductosComponent implements OnInit{ 

    constructor(){}

    ngOnInit(): void {

    }

}