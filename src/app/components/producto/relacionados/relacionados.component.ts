import { Component, OnInit, Input } from "@angular/core";
import { ProductServiceController } from "src/app/services/producto.service";
import { ProductosComponent } from "../../productos/productos.component";
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
    selector:'relacionados-component',
    styleUrls:['../../home/home.component.css'],
    templateUrl:'../../home/nuevos/nuevos.component.html',
    providers:[ProductosComponent],
})

export class RelacionadosComponent implements OnInit{

  constructor(private _serviceProductos:ProductServiceController){}

  @Input() idProducto:number;
  @Input() tipoProducto:number;

  productos:Array<any>=[];
  charged:boolean = false;

  ngOnInit(): void {
    this.chargeProductByType(this.idProducto, this.tipoProducto);
  }

  chargeProductByType(idProducto:number, tipoProducto:number){
    this._serviceProductos.getProductosByTipo(tipoProducto)
    .subscribe(
      (res:any[])=>{
        for(let i=0; i < res.length; i++){
          if(idProducto != res[i].id_producto){
            this.productos.push(res[i]);
          }
        }
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
        items: 2
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