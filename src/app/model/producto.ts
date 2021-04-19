export class Producto{

    id_producto:number;
    descripcion:string;
    origen:string;
    familia:string;
    marca:string;
    precio:number;
    tipo_producto:number;
    stock:number;
    img:string;
    mas_vendido:boolean;
    nuevo:boolean;
    nombre_producto:string;

    constructor(id_producto:number, descripcion:string, origen:string, familia:string, marca:string,
        precio:number, tipo_producto:number, stock:number, img:string, mas_vendido:boolean,
        nuevo:boolean, nombre_producto:string
        ){
        this.id_producto = id_producto;
        this.descripcion = descripcion;
        this.origen = origen;
        this.familia = familia;
        this.marca = marca;
        this.precio = precio;
        this.tipo_producto = tipo_producto;
        this.stock = stock;
        this.img = img;
        this.mas_vendido = mas_vendido;
        this.nuevo = nuevo;
        this.nombre_producto = nombre_producto;
    }
}