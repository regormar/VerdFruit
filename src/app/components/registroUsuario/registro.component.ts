import { Component, OnInit } from "@angular/core";

@Component({
    selector:'registro-component',
    templateUrl:'./registro.component.html',
    styleUrls:['./registro.component.css']
})

export class RegistroUsuarioComponent implements OnInit{

    opcion:string = "particular";

    constructor(){     
    }

    ngOnInit(): void {
        this.changeRegister(this.opcion);
    }

    changeRegister(opcion:string){
        this.opcion = opcion;
        var element = document.getElementById("particular");
        var element2 = document.getElementById("business");
        if(opcion === "particular"){            
            element?.classList.add("selected");
            element2?.classList.remove("selected");
        }else{
            element?.classList.remove("selected");
            element2?.classList.add("selected");
        }
    }
}