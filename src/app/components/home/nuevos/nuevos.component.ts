import { Component, OnInit } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";
import { ProductServiceController } from "src/app/services/producto.service";
import { ProductosComponent } from "../../productos/productos.component";

@Component({
    selector:'nuevos-component',
    styleUrls:['../home.component.css'],
    templateUrl:'./nuevos.component.html',
    providers:[ProductosComponent],
})

export class NuevosComponent implements OnInit{

  constructor(private _serviceProductos:ProductServiceController){}

  productos:Array<any>=[];

  ngOnInit(): void {
    this._serviceProductos.getProductosNuevo()
    .subscribe(
      (res:any[])=>{
        this.productos = res;
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
    pullDrag: true,
    dots: false,
    margin:10,
    navSpeed: 700,
    navText: [
      "<i class='fa fa-caret-left'></i>",
      "<i class='fa fa-caret-right'></i>"
    ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: false
  }

}