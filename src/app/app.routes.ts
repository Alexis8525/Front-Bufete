import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';
import { SolicitudCitaComponent } from './components/solicitud-cita/solicitud-cita.component';
import { CrudEmpleadoComponent } from './components/crud-empleado/crud-empleado.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { GestionCitaComponent } from './components/gestion-cita/gestion-cita.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'barra', component: BarraLateralComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'upload-file', component: UploadFileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'cita', component: SolicitudCitaComponent },
  { path: 'empleado', component: CrudEmpleadoComponent },
  { path: 'prueba', component: PruebaComponent },
  { path: 'gestion-cita', component: GestionCitaComponent},
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UploadFileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NavbarComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    UploadFileComponent,
  ],
})
export class AppRoutingModule {}
