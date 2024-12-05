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
import { CalendarioCitasClienteComponent } from './components/calendario-citas-cliente/calendario-citas-cliente.component';
import { CalendarioCitasAbogadoComponent } from './components/calendario-citas-abogado/calendario-citas-abogado.component';
import { CalendarioCitasSecretariaComponent } from './components/calendario-citas-secretaria/calendario-citas-secretaria.component';
import { DocumentViewerComponent } from './components/document-viewer/document-viewer.component';
import { GestionPagoComponent } from './components/gestion-pago/gestion-pago.component';
import { VisualizarPdfComponent } from './components/visualizar-pdf/visualizar-pdf.component';
import { HistorialExpedienteComponent } from './components/historial-expediente/historial-expediente.component';
import { ExpedienteComponent } from './components/expediente/expediente.component';
import { TapsComponent } from './components/taps/taps.component';
import { InformacionGeneralComponent } from './components/informacion-general/informacion-general.component';
import { DatosPartesComponent } from './components/datos-partes/datos-partes.component';
import { RegistroCitasComponent } from './components/registro-citas/registro-citas.component';
import { DocumentacionLegalComponent } from './components/documentacion-legal/documentacion-legal.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'barra', component: BarraLateralComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'taps', component: TapsComponent },
  { path: 'DatosPartes', component: DatosPartesComponent },
  { path: 'documentos', component: DocumentacionLegalComponent },
  { path: 'citasRegistro', component: RegistroCitasComponent },
  { path: 'informacion', component: InformacionGeneralComponent },
  { path: 'home', component: HomeComponent },
  { path: 'upload-file', component: UploadFileComponent },
  { path: 'visualizar', component: VisualizarPdfComponent },
  { path: 'document-viewer', component: DocumentViewerComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'cita', component: SolicitudCitaComponent },
  { path: 'historial-expedientes', component: HistorialExpedienteComponent },
  { path: 'empleado', component: CrudEmpleadoComponent },
  { path: 'prueba', component: PruebaComponent },
  { path: 'gestion-cita', component: GestionCitaComponent},
  { path: 'gestion-pago', component: GestionPagoComponent },
  { path: 'gestion-cliente', component: CrudClienteComponent},
  { path: 'gestion-horario', component: GestionHorarioComponent},
  { path: 'principal', component: PrincipalComponent },
  { path: 'calendario-cliente', component: CalendarioCitasClienteComponent },
  { path: 'calendario-abogado', component: CalendarioCitasAbogadoComponent },
  { path: 'calendario-secretaria', component: CalendarioCitasSecretariaComponent },
  { path: 'expediente', component: ExpedienteComponent }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NavbarComponent,
    UploadFileComponent
  ],
  exports: [
    UploadFileComponent
  ],
})
export class AppRoutingModule {}
