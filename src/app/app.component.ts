import { Component, OnInit } from '@angular/core';
import { CookiesServiceController } from './services/cookies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[CookiesServiceController],
})
export class AppComponent{

  // constructor(private _cookiesService:CookiesServiceController){}

  // ngOnInit(): void {
  //     //Check if token exists.
  //     let rememberMe = this._cookiesService.getCookie("rememberMe");
  //     if(rememberMe != ""){
  //       let id = this._cookiesService.getCookie("id");
  //       if(id == ""){

  //       }
  //     }
  //     //If exists check if it's valid

  // }
  title = 'VerdFruit';

}
