import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { SolicitudCitaComponent } from './components/solicitud-cita/solicitud-cita.component';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },        // Ruta por defecto (home)
  { path: 'home', component:HomeComponent },
  { path: 'cita', component: SolicitudCitaComponent},
  { path: 'barra', component: BarraLateralComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }