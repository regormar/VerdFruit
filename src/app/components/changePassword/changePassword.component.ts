import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Empresa } from "src/app/model/empresa";
import { Particular } from "src/app/model/particular";
import { Usuario } from "src/app/model/usuario";
import { CookiesServiceController } from "src/app/services/cookies.service";
import { UserServiceController } from "src/app/services/user.service";

@Component({
    selector:'changePassword-component',
    templateUrl:'./changePassword.component.html',
    styleUrls:['./changePassword.component.css'],
    providers:[UserServiceController],
})

export class ChangePasswordComponent{
    
    pass:string;
    verification:string;
    token:string;
    id:string;
    particular:Particular;
    empresa:Empresa;

    constructor(private _service:UserServiceController, private translate: TranslateService,
        private _router: Router, private _activRoute: ActivatedRoute){}

    ngOnInit(): void {
        this._activRoute.paramMap.subscribe(
            params => {
            this.id = params.get("id");
            }
        )        
    }

    changePassword(event){
        this._service.getUsuarioById(this.id)
        .subscribe(
            (res) => {
                console.log(res.username);
                this._service.checkLoginUsername(res.username, res.pass)
                .subscribe(
                    (res2) => {
                        localStorage.setItem("token",res2.token);
                        if(res['tipo'] == 1){
                            this.particular = res;
                            this.particular.pass = this.pass;
                            this._service.putParticular(this.particular)
                            .subscribe(
                                (res3) => {                                   
                                    localStorage.removeItem("token");
                                    event.target.reset();
                                    this._router.navigate(['/login']);
                                },
                                (err) => {
                                    console.log(err)
                                }
                            ); 
                        }
                        if(res['tipo'] == 2){
                            this.empresa = res;
                            this.empresa.pass = this.pass;
                            this._service.putEmpresa(this.empresa)
                            .subscribe(
                                (res) => {
                                    event.target.reset();
                                    this._router.navigate(['/login']);
                                },
                                (err) => {
                                    console.log(err)
                                }
                            ); 
    
                        }
                    },
                    (err) =>{

                    }
                );         
            },
            (err) => {
                console.log(err);
            }
        );

    }

}