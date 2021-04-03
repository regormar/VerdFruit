import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroUsuarioComponent } from './components/registroUsuario/registro.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/resetPassword/resetPassword.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { ChangePasswordComponent } from './components/changePassword/changePassword.component';

const routes: Routes = [
  // {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroUsuarioComponent},
  {path:'reset-password',component:ResetPasswordComponent},
  {path:'questions',component:QuestionsComponent},
  {path:'changePassword/:id',component:ChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
