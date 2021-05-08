import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductServiceController } from "src/app/services/producto.service";
import { TranslateService } from "@ngx-translate/core";
import { UserServiceController } from "src/app/services/user.service";
import { ProductosComponent } from "../productos/productos.component";
import { Producto } from "src/app/model/producto";


@Component({
    selector:'producto-component',
    templateUrl:'./producto.component.html',
    styleUrls:['./producto.component.css'],
    providers:[ProductServiceController],
})

export class ProductoComponent implements OnInit{ 

    idProducto:number;
    producto:Producto;

    constructor(private _serviceProductos:ProductServiceController,  private translate: TranslateService,
        private _router: Router, private _activRoute: ActivatedRoute){}
    

    ngOnInit(): void {
        this._activRoute.paramMap.subscribe(
            (params) => {
                this.idProducto = +params.get("idProducto");
            }
        )  

        this._serviceProductos.getProductoById(this.idProducto)
        .subscribe(
            (result:Producto)=>{
                this.producto = result;
            },
            (error) =>{
                console.log(error);
            }
        );

    }


}