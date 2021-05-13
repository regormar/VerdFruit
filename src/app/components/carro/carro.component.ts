import { Component, Inject, Injectable } from "@angular/core";
import { ListaProductos } from "src/app/model/listaProductos";
import { Pedido } from "src/app/model/pedido";
import { Producto } from "src/app/model/producto";
import { OrderServiceController } from "src/app/services/pedido.service";
import { ProductServiceController } from "src/app/services/producto.service";
import { UserServiceController } from "src/app/services/user.service";

@Component({
    selector:'carro-component',
    templateUrl:'./carro.component.html',
    styleUrls:['./carro.component.css'],
    providers:[OrderServiceController, ProductServiceController],
})

@Injectable()
export class CarroComponent{
    carritoOpen:boolean; 
    carro:Pedido = null;
    productos:Producto[] = Array<Producto>();
    producto:Producto;
    cargado:boolean = false;

    constructor(private _orderService:OrderServiceController,
        private _productService:ProductServiceController){
            sessionStorage.setItem('show', "false");
    }

    ngOnInit(): void {
        let idUsuario = localStorage.getItem("_id");
        if(idUsuario != ""){
            this._orderService.getPedidosByStatus(idUsuario, -1)
            .subscribe(
                (res) => {
                    if(res.length != 0){
                        this.carro = res[0];
                        for(let i  = 0; i < this.carro.listaProductos.length; i++){
                            this._productService.getProductoById(this.carro.listaProductos[i].id_producto)
                            .subscribe(
                                (res2) => {
                                    this.cargado = true;
                                    this.producto = new Producto(res2['id_producto'],res2['descripcion'],res2['origen'],res2['familia'],res2['marca'],res2['precio'],
                                    res2['tipo_producto'],res2['stock'],res2['img'],res2['mas_vendido'],res2['nuevo'],res2['nombre_producto'],);
                                    this.productos.push(this.producto);
                                },
                                (err) => {
                                    console.log(err);
                                }
                            );
                        }                          
                    }                          
                },
                (err) => {
                    console.log(err);
                }
            );
        }  
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

    putPedido(){
        this._orderService.putPedido(this.carro)
        .subscribe(
            (res) => {
            },
            (err) => {
                console.log(err);
            }
        );
    }

    changeProductUnits(type:string, id_producto:number, event){
        let listaProductos = this.carro.listaProductos;
        for(let i  = 0; i < listaProductos.length; i++){
            if(listaProductos[i].id_producto == id_producto){
                let precioUnidad = 0;
                for(let j  = 0; j < this.productos.length; j++){
                    if(this.productos[j].id_producto == listaProductos[i].id_producto){
                        precioUnidad = this.productos[j].precio;
                    }
                }
                if(type == "+"){
                    listaProductos[i].cantidad++;         
                    this.carro.precio_final += precioUnidad;
                    listaProductos[i].precio += precioUnidad;
                    if(listaProductos[i].cantidad == 2){
                        event.target.previousSibling.disabled = false;
                    }
                }else{
                    listaProductos[i].cantidad--;
                    this.carro.precio_final -= precioUnidad;
                    listaProductos[i].precio -= precioUnidad;
                    if(listaProductos[i].cantidad == 1){
                        event.target.disabled = true;
                    }
                }
            }
        } 
        this.putPedido();
    }

    eliminarProducto(id_producto:number, precio:number, i:number){
        //Reducir precio total, cantidad y eliminar producto del array.
        this.carro.precio_final -= precio
        this.carro.cantidad_productos--;
        this.carro.listaProductos.splice(i,1);
        //Elminar producto de la lista en la base de datos.
        this._orderService.deleteProductFromOrder(this.carro.id_listaproducto, id_producto)
        .subscribe(
            (res) => {
                if(this.carro.listaProductos.length === 0){
                    this.carro = null;
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    encogerMenu(){
        let element = document.getElementById("cartMenu");
        element.style.height = "300px";
    }

    comprar(){
        console.log("comprando");
        this._orderService.realizarPedido(localStorage.getItem("_id"),this.carro.id_listaproducto)
        .subscribe(
            (response)=>{
                window.location.reload();
            },
            (err)=>{
                console.log(err);
            }
        );
    }

}