import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list'; 


/** COMPONENTES */
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
    imports: [
      RouterModule.forRoot(routes),
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatIconModule,
      MatButtonModule,
      MatToolbarModule,
      MatSidenavModule,
      MatListModule
    ],
    exports: [
      RouterModule,
    ]
  })

export class AppRoutingModule { }