
import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CookiesServiceController } from "src/app/services/cookies.service";
import { UserServiceController } from "src/app/services/user.service";


@Component({
    selector:'questions-component',
    templateUrl:'./questions.component.html',
    styleUrls:['./questions.component.css'],
    providers:[UserServiceController, CookiesServiceController],
})


export class QuestionsComponent {
    constructor(private _service:UserServiceController, private translate: TranslateService){}

    ngOnInit(): void {
        var acc = document.getElementsByClassName("pregunta");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                } 
            });
        }
    }
    
}