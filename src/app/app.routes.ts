import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { SolicitudCitaComponent } from './components/solicitud-cita/solicitud-cita.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },        // Ruta por defecto (home)
  { path: 'home', component:HomeComponent },
  { path: 'cita', component: SolicitudCitaComponent},
  { path: 'barra', component: SidebarComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }