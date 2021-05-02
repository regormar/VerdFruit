import { ListaProductos } from "./listaProductos";

export class Pedido{

    id_usuario:string;
    id_listaproducto:string;
    fecha_creacion:Date;
    estado:number;
    cantidad_productos:number;
    precio_final:number;
    listaProductos:ListaProductos[];

    constructor(id_usuario:string, id_listaproducto:string, fecha_creacion:Date, estado:number, 
        cantidad_productos:number, precio_final:number, listaProductos:ListaProductos[]){
        this.id_usuario = id_usuario;
        this.id_listaproducto = id_listaproducto;
        this.fecha_creacion = fecha_creacion;
        this.estado = estado;
        this.cantidad_productos = cantidad_productos;
        this.precio_final = precio_final;
        this.listaProductos = listaProductos;
    }
}