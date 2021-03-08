import { Component, OnInit } from "@angular/core";
import { UserServiceController } from "src/app/services/user.service";

@Component({
    selector:'home-component',
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.css'],
    providers:[UserServiceController],
})

export class HomeComponent implements OnInit{
    

    constructor(private _service:UserServiceController){}

    ngOnInit(): void {

    }

}