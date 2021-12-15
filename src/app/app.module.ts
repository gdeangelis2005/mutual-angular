import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AutoconsultasComponent } from './pages/autoconsultas/autoconsultas.component';
import { AutoridadesComponent } from './pages/autoridades/autoridades.component';
import { DelegacionesComponent } from './pages/delegaciones/delegaciones.component';

import { TurismoComponent } from './pages/turismo/turismo.component';
import { NovedadesComponent } from './pages/novedades/novedades.component';
import { HaceteSocioComponent } from './pages/hacete-socio/hacete-socio.component';
import { TramitesComponent } from './pages/tramites/tramites.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    LoginComponent,
    AutoconsultasComponent,
    AutoridadesComponent,
    DelegacionesComponent,
    TramitesComponent,
    TurismoComponent,
    NovedadesComponent,
    HaceteSocioComponent,
    NavbarComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }




// Servicios
// import { TareasService } from './servicios/tareas.service';


//  providers: [
//    TareasService
//  ],
