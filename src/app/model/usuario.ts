export class Usuario{

    id:number;
    username:string;
    pass:string;
    email:string;
    nombre:string;
    apellidos:string;
    direccion:string;
    direccion2:string;
    telefono:string;
    tipo:number;

    constructor(id:number, username:string, pass:string, email:string, nombre:string,
        apellidos:string, direccion:string, direccion2:string, telefono:string, tipo:number
        ){
        this.id = id;
        this.username = username;
        this.pass = pass;
        this.email = email;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.direccion2 = direccion2;
        this.telefono = telefono;
        this.tipo = tipo;
    }
}