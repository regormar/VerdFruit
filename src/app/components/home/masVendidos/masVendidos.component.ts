import { Component, OnInit } from "@angular/core";
import { ProductServiceController } from "src/app/services/producto.service";
import { ProductosComponent } from "../../productos/productos.component";
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
    selector:'vendido-component',
    styleUrls:['../home.component.css'],
    templateUrl:'../nuevos/nuevos.component.html',
    providers:[ProductosComponent],
})

export class MasVendidosComponent implements OnInit{

  constructor(private _serviceProductos:ProductServiceController){}

  productos:Array<any>=[];
  charged:boolean = false;

  ngOnInit(): void {
    this._serviceProductos.getProductosMasVendidos()
    .subscribe(
      (res:any[])=>{
        this.productos = res;
        this.charged = true;
      },
      (err) =>{
        console.log(err);
      }
    );
  }

  customOptions: OwlOptions = {
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin:10,
    navSpeed: 700,
    navText: ["",""],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      850: {
        items: 3
      },
      940: {
        items: 4
      },

    },
    nav: false
  }

}