import { Component, OnInit } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";
import { ProductServiceController } from "src/app/services/producto.service";
import { ProductosComponent } from "../productos/productos.component";

@Component({
    selector:'home-component',
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.css'],
    providers:[],
})

export class HomeComponent implements OnInit{
    

    constructor(private _serviceProductos:ProductServiceController){}

    ngOnInit(): void {
    }



}