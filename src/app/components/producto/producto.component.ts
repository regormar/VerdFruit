import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ProductServiceController } from "src/app/services/producto.service";
import { TranslateService } from "@ngx-translate/core";
import { OrderServiceController } from "src/app/services/pedido.service";
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

    usuLogin:boolean = true; 

    idUsuario:string = "";
    idProducto:number;
    producto:Producto  = null;
    productCarro:Producto;

    datosCarga:boolean = false; 
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

    isDisabled: boolean = true;

    mySubscription: any;

    constructor(private _serviceProductos:ProductServiceController,  private translate: TranslateService,
        private _orderService:OrderServiceController, private _router: Router, private _activRoute: ActivatedRoute,
        private router:Router){
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
            };
            this.mySubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // Modificamos el Router para que crea que no ha visitado el ultimo link y recargue el componente aunque nos encontremos en el.
                this.router.navigated = false;
            }
        });
        if(localStorage.getItem("_id") == null){
            this.usuLogin = false;
            this.datosCarga = true;
        }
    }
    
    ngOnDestroy() {
        if (this.mySubscription) {
          this.mySubscription.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.datosCarga = false;
        if(localStorage.getItem("_id") == null){
            this.datosCarga = true;
        }
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
        if(this.idUsuario != null){
            this._orderService.getPedidosByStatus(this.idUsuario, -1)
            .subscribe(
                (res) => {
                    this.datosCarga = true;
                    if(res.length != 0){
                        this.existePedido = true;
                        this.carro = res[0];
                        this.cantidadCarrito = this.carro.cantidad_productos;
                        for(let i=0; i < this.carro.listaProductos.length; i++){
                            if(this.idProducto == this.carro.listaProductos[i].id_producto){
                                this.estaCarrito = true;
                                this.cantidadProducto = this.carro.listaProductos[i].cantidad;
                                if(this.carro.listaProductos[i].cantidad > 1){
                                    this.isDisabled = false;
                                }
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
    
    changeProductUnits(type:string){
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
                            if(listaProductos[i].cantidad > 1){
                                this.isDisabled = false;
                            }
                        }else{
                            listaProductos[i].cantidad--;
                            this.cantidadProducto--;
                            this.carro.precio_final -= precioUnidad;
                            listaProductos[i].precio -= precioUnidad;
                            if(listaProductos[i].cantidad == 1){
                                this.isDisabled = true;
                            }
                        }
                    }
                } 
                this.putPedido();
            }else{
                if(type == "+"){
                    this.cantidadProducto++; 
                    this.precioTotalProducto += this.producto.precio; 
                    if(this.cantidadProducto > 1){
                        this.isDisabled = false;
                    }
                }else{
                    this.cantidadProducto--;
                    this.precioTotalProducto -= this.producto.precio; 
                    if(this.cantidadProducto == 1){
                        this.isDisabled = true;
                    }
                }
            }
        }else{
            this.cantidadCarrito = 1;
            if(type == "+"){
                this.cantidadProducto++; 
                this.precioTotalProducto += this.producto.precio; 
                if(this.cantidadProducto > 1){
                    this.isDisabled = false;
                }
            }else{
                this.cantidadProducto--;
                this.precioTotalProducto -= this.producto.precio; 
                if(this.cantidadProducto == 1){
                    this.isDisabled = true;
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