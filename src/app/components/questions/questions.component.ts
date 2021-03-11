
import { Component, OnInit } from "@angular/core";
import { CookiesServiceController } from "src/app/services/cookies.service";
import { UserServiceController } from "src/app/services/user.service";


@Component({
    selector:'questions-component',
    templateUrl:'./questions.component.html',
    styleUrls:['./questions.component.css'],
    providers:[UserServiceController, CookiesServiceController],
})


export class QuestionsComponent {
    

}