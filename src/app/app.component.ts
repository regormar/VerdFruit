import { Component, OnInit } from '@angular/core';
import { CookiesServiceController } from './services/cookies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[CookiesServiceController],
})
export class AppComponent{

  constructor(private _cookiesService:CookiesServiceController){}

  accepted:boolean = false;

  ngOnInit(): void {
    let acceptedCookies = this._cookiesService.getCookie("acceptedCookies");
    if(acceptedCookies != ""){
      this.accepted = true;
    }
  }

  title = 'VerdFruit';

}
