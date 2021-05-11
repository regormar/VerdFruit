import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductServiceController } from "src/app/services/producto.service";
import { TranslateService } from "@ngx-translate/core";
import { OrderServiceController } from "src/app/services/pedido.service";
import { UserServiceController } from "src/app/services/user.service";
import { ProductosComponent } from "../productos/productos.component";
import { Producto } from "src/app/model/producto";
import { Pedido } from "src/app/model/pedido";
import { ListaProductos } from "src/app/model/listaProductos";


@Component({
    selector:'producto-component',
    templateUrl:'./producto.component.html',
    styleUrls:['./producto.component.css'],
    providers:[ProductServiceController],
})

export class ProductoComponent implements OnInit{ 

    idUsuario:string = "";
    idProducto:number;
    producto:Producto;
    productCarro:Producto;

    estaCarrito:boolean = false; 
    existePedido:boolean = false;
    precioTotalProducto:number = 0;
    carro:Pedido = null;
    cantidadCarrito:number = 1;

    
    id_listaproducto = "lista"+this.idUsuario;
    date = new Date();
    fechaCreacion = this.date.getDay() + "/" + this.date.getMonth() + "/" + this.date.getFullYear();
    productoCarro:ListaProductos;
    listaProductos:ListaProductos[] = Array<ListaProductos>();
    cantidadProducto:number = 1;




    constructor(private _serviceProductos:ProductServiceController,  private translate: TranslateService,
    private _orderService:OrderServiceController, private _router: Router, private _activRoute: ActivatedRoute){}
    

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
                this.precioTotalProducto = this.producto.precio;
            },
            (error) =>{
                console.log(error);
            }
        );

        this.idUsuario = localStorage.getItem("_id");
        if(this.idUsuario != ""){
            this._orderService.getPedidosByStatus(this.idUsuario, -1)
            .subscribe(
                (res) => {
                    if(res.length != 0){
                        this.existePedido = true;
                        this.carro = res[0];
                        this.cantidadCarrito = this.carro.cantidad_productos;
                        for(let i=0; i < this.carro.listaProductos.length; i++){
                            if(this.idProducto == this.carro.listaProductos[i].id_producto){
                                this.estaCarrito = true;
                                this.cantidadProducto = this.carro.listaProductos[i].cantidad;
                            }
                        }                          
                    }else{
                        this.existePedido = false;
                    }                          
                },
                (err) => {
                    console.log(err);
                }
            );
        }  


    }
    
    changeProductUnits(type:string, event){
        if(this.existePedido == true){
            let listaProductos = this.carro.listaProductos;
            if(this.estaCarrito != false){
                for(let i=0; i < listaProductos.length; i++){
                    if(this.idProducto == listaProductos[i].id_producto){
                        let precioUnidad = this.producto.precio;
                        if(type == "+"){
                            listaProductos[i].cantidad++; 
                            this.cantidadProducto++;        
                            this.carro.precio_final += precioUnidad;
                            listaProductos[i].precio += precioUnidad;
                            if(listaProductos[i].cantidad == 2){
                                event.target.previousSibling.disabled = false;
                            }
                        }else{
                            listaProductos[i].cantidad--;
                            this.cantidadProducto--;
                            this.carro.precio_final -= precioUnidad;
                            listaProductos[i].precio -= precioUnidad;
                            if(listaProductos[i].cantidad == 1){
                                event.target.disabled = true;
                            }
                        }
                    }
                } 
                this.putPedido();
            }else{
                if(type == "+"){
                    this.cantidadProducto++; 
                    this.precioTotalProducto += this.producto.precio; 
                    if(this.cantidadProducto == 2){
                        event.target.previousSibling.disabled = false;
                    }
                }else{
                    this.cantidadProducto--;
                    this.precioTotalProducto -= this.producto.precio; 
                    if(this.cantidadProducto == 1){
                        event.target.disabled = true;
                    }
                }
            }
        }else{
            this.cantidadCarrito = 1;
            if(type == "+"){
                this.cantidadProducto++; 
                this.precioTotalProducto += this.producto.precio; 
                if(this.cantidadProducto == 2){
                    event.target.previousSibling.disabled = false;
                }
            }else{
                this.cantidadProducto--;
                this.precioTotalProducto -= this.producto.precio; 
                if(this.cantidadProducto == 1){
                    event.target.disabled = true;
                }
            }
            
        }
        
    }

    anyadirProductoCarrito(){
        console.log("precio producto: " + this.precioTotalProducto);
        if(this.existePedido == true){
            console.log(this.carro.cantidad_productos);
            this.carro.cantidad_productos++;
            console.log(this.carro.cantidad_productos);
            this.carro.precio_final += this.precioTotalProducto;
            this.productoCarro = new ListaProductos(this.idProducto,this.cantidadProducto,this.precioTotalProducto);
            this.carro.listaProductos.push(this.productoCarro);
            this.putPedido();
        }else{
            this.productoCarro = new ListaProductos(this.idProducto,this.cantidadProducto,this.precioTotalProducto);
            this.listaProductos.push(this.productoCarro);
            this.carro = new Pedido(this.idUsuario,this.id_listaproducto,this.date,-1,this.cantidadCarrito,this.precioTotalProducto,this.listaProductos);
            this.postPedido();
        }
        window.location.reload();
    }

    quitarCarrito(){
        this._orderService.deleteProductFromOrder(this.carro.id_listaproducto, this.idProducto)
        .subscribe(
            (res) => {
            },
            (err) => {
                console.log(err);
            }
        );
        
        window.location.reload();

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

    postPedido(){
        this._orderService.postPedido(this.carro)
        .subscribe(
            (res) => {
            },
            (err) => {
                console.log(err);
            }
        );
    }

}