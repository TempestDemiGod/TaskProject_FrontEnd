import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { TareasComponent } from './pages/tareas/tareas.component';
import { TareasCursoComponent } from './pages/tareas-curso/tareas-curso.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {path: '' , redirectTo: 'home' , pathMatch: 'full'},
  {path: 'login',canActivate: [loginGuard] , component: SignInPageComponent},
  // , , canActivate: [loginGuard]
  //canActivate: [authGuard] ,
  {path: 'home', canActivate: [authGuard] , component: HomePageComponent, children: [
    {path: '' , component: CursosComponent },
    {path: 'all-Tasks' , component: TareasComponent },
    {path: 'course/:id/:name' , component: TareasCursoComponent },
  ]},
  {path: '**' , canActivate: [authGuard] , component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
