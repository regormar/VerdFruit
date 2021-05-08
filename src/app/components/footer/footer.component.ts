import { Component, OnInit } from "@angular/core";

@Component({
    selector:'footer-component',
    templateUrl:'./footer.component.html',
    styleUrls:['./footer.component.css'],
})

export class FooterComponent {

    menu:boolean = false;

    constructor(){
      if(localStorage.getItem("token") == null){
          this.menu = true;
      } else{
          this.menu = false
      }
    }
}