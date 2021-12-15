import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AutoconsultasComponent } from './pages/autoconsultas/autoconsultas.component';
import { AutoridadesComponent } from './pages/autoridades/autoridades.component';
import { DelegacionesComponent } from './pages/delegaciones/delegaciones.component';
import { TramitesComponent } from './pages/tramites/tramites.component';
import { TurismoComponent } from './pages/turismo/turismo.component';
import { NovedadesComponent } from './pages/novedades/novedades.component';
import { HaceteSocioComponent } from './pages/hacete-socio/hacete-socio.component';





import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: 'Autoconsultas'   , component: AutoconsultasComponent },
  { path: 'Autoridades'   , component: AutoridadesComponent },
  { path: 'Delegaciones'   , component: DelegacionesComponent },
  { path: 'Tramites'   , component: TramitesComponent },
  { path: 'Turismo'   , component: TurismoComponent },
  { path: 'Novedades'   , component: NovedadesComponent },
  { path: 'haceteSocio'   , component: HaceteSocioComponent },
    
  //{ path: 'about', component: AboutComponent, canActivate: [ AuthGuard ]  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }


//export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});
