import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { RegistroUsuarioComponent } from './components/registroUsuario/registro.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/resetPassword/resetPassword.component';
import { QuestionsComponent } from './components/questions/questions.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroUsuarioComponent},
  {path:'usuario',component:UsuarioComponent},
  {path:'reset-password',component:ResetPasswordComponent},
  {path:'questions',component:QuestionsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
