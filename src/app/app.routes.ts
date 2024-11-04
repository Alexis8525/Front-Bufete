import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';
import { SolicitudCitaComponent } from './components/solicitud-cita/solicitud-cita.component';
import { CrudEmpleadoComponent } from './components/crud-empleado/crud-empleado.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { GestionCitaComponent } from './components/gestion-cita/gestion-cita.component';
import { CrudClienteComponent } from './components/crud-cliente/crud-cliente.component';
import { GestionHorarioComponent } from './components/gestion-horario/gestion-horario.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { DocumentViewerComponent } from './components/document-viewer/document-viewer.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'barra', component: BarraLateralComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'upload-file', component: UploadFileComponent },
  { path: 'document-viewer', component: DocumentViewerComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'cita', component: SolicitudCitaComponent },
  { path: 'empleado', component: CrudEmpleadoComponent },
  { path: 'prueba', component: PruebaComponent },
  { path: 'gestion-cita', component: GestionCitaComponent},
  { path: 'gestion-cliente', component: CrudClienteComponent},
  { path: 'gestion-horario', component: GestionHorarioComponent},
  { path: 'principal', component: PrincipalComponent },
];

@NgModule({
  declarations: [
    RegisterComponent,
    UploadFileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NavbarComponent,
    DocumentViewerComponent
  ],
  exports: [
    RegisterComponent,
    UploadFileComponent,
  ],
})
export class AppRoutingModule {}
