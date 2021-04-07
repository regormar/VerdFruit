import { Usuario } from "./usuario";

export class Particular extends Usuario{

    dni:string;

    constructor(id:number, username:string, pass:string, email:string, nombre:string,
        apellidos:string, direccion:string, direccion2:string, telefono:string, tipo:number, dni:string){
            super(id,username,pass,email,nombre,apellidos,direccion,direccion2,telefono,tipo);
            this.dni = dni;
    }

}