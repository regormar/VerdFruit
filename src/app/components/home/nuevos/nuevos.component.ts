import { Component, OnInit } from "@angular/core";
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
  // productosTotal:Array<Array<any>>=[];

  //Al iniciar el componente guardo en un bidimensional los productos divididos de 4 en 4.
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
    // this._serviceProductos.getProductosNuevo()
    // .subscribe(
    //   (res:any[])=>{
    //     console.log(res);
    //     for(let i = 0; i < res.length; i++){
    //       console.log(res[i]);
    //       this.productosVista.push(res[i]);
    //       if (this.productosVista.length % 4 === 0) {
    //         for(let j = 0; j < this.productosVista.length; j++){
    //           this.productosTotal.push(this.productosVista[j]);
    //         }
    //         this.productosVista = [];
    //       }
    //     }
    //     console.log(this.productosTotal);
    //   },
    //   (err) =>{
    //     console.log(err);
    //   }
    // );
  }

}