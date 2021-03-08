export class Usuario{

    id:number;
    username:string;
    pass:string;
    email:string;
    nombre:string;
    apellidos:string;
    direccion:string;
    telefono:string;
    tipo:number;

    constructor(id:number, username:string, pass:string, email:string, nombre:string,
        apellidos:string, direccion:string, telefono:string, tipo:number
        ){
        this.id = id;
        this.username = username;
        this.pass = pass;
        this.email = email;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.telefono = telefono;
        this.tipo = tipo;
    }
}