import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { TareasComponent } from './pages/tareas/tareas.component';
import { TareasCursoComponent } from './pages/tareas-curso/tareas-curso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInPageComponent,
    HomePageComponent,
    NavbarComponent,
    CardComponent,
    CursosComponent,
    TareasComponent,
    TareasCursoComponent,
    LoadingComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
