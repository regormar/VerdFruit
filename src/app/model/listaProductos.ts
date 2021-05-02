
export class ListaProductos{

    id_producto:number;
    cantidad:number;
    precio:number;

    constructor(id_producto:number, cantidad:number, precio:number){
        this.id_producto = id_producto;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}