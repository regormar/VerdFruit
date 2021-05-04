import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { UserServiceController } from "src/app/services/user.service";

@Component({
    selector:'resetPassword-component',
    templateUrl:'./resetPassword.component.html',
    styleUrls:['./resetPassword.component.css'],
    providers:[UserServiceController],
})

export class ResetPasswordComponent{
    
    mensaje:string;
    error:string;
    email:string;

    constructor(private _service:UserServiceController, private translate: TranslateService){}

    ngOnInit(): void {}

    sendEmail(){
        //Comprobar que exista un usuario con ese correo.
        this._service.getEmail(this.email)
        .subscribe(
            (result) => {
                this.translate.get('RECOVERMSG')
                .subscribe(
                    (res: string) =>{
                        this.error = "";
                        this.mensaje = res;
                        window.alert(this.mensaje);
                    }
                );
                this.email = "";
            },
            (error) => {
                if(error.status == 400){
                    this.translate.get('INVALIDEMAIL')
                    .subscribe(
                        (res: string) =>{
                            this.mensaje = "";
                            this.error = res;
                        }
                    ); 
                }
            }
        );


    }
}