
export class ListaProductos{

    id_listaproducto:number;
    id_producto:number;
    cantidad:number;
    precio:number;

    constructor(id_listaproducto:number, id_producto:number, cantidad:number, precio:number){
        this.id_listaproducto = id_listaproducto;
        this.id_producto = id_producto;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}