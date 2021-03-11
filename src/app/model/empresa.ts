import { Usuario } from "./usuario";

export class Empresa extends Usuario{

    cif:string;
    nombre_fiscal:string;
    nombre_comercial:string;

    constructor(id:number, username:string, pass:string, email:string, nombre:string,
        apellidos:string, direccion:string, telefono:string, tipo:number, cif:string,
        nombre_fiscal:string, nombre_comercial:string){
            super(id,username,pass,email,nombre,apellidos,direccion,telefono,tipo);
            this.cif = cif;
            this.nombre_fiscal = nombre_fiscal;
            this.nombre_comercial = nombre_comercial;
    }

}