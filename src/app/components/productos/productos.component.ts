import { Component, OnInit } from "@angular/core";
import { ProductServiceController } from "src/app/services/producto.service";
import { UserServiceController } from "src/app/services/user.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector:'productos-component',
    templateUrl:'./productos.component.html',
    styleUrls:['./productos.component.css'],
    providers:[ProductServiceController],
})

export class ProductosComponent implements OnInit{ 

    constructor(private _serviceProductos:ProductServiceController, 
        private _router: Router, private _activRoute: ActivatedRoute){}
    
    productos:Array<any> = [];

    ngOnInit(): void {
        this.busquedaProductos("");
    }

    busquedaProductos(busqueda:string){
        this._serviceProductos.getProductos(busqueda)
        .subscribe(
            (result:any[])=>{
                this.productos = result;
            },
            (error) =>{
                console.log(error);
            }
        );
    }

    busquedaCategoria(tipo:string){
        this._serviceProductos.getProductosByFamilia(tipo)
        .subscribe(
            (result:any[])=>{
                this.productos = result;
            },
            (error) =>{
                console.log(error);
            }
        );
    }

    infoProducto(){
        this._router.navigate(['/producto/:id']);
    }

}