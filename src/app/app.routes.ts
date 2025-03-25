import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/pagina-principal/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';
import { SolicitudCitaComponent } from './components/solicitud-cita/solicitud-cita.component';
import { CrudEmpleadoComponent } from './components/crud-empleado/crud-empleado.component';
import { GestionCitaComponent } from './components/gestion-cita/gestion-cita.component';
import { CrudClienteComponent } from './components/crud-cliente/crud-cliente.component';
import { GestionHorarioComponent } from './components/gestion-horario/gestion-horario.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { CalendarioCitasClienteComponent } from './components/calendario-citas-cliente/calendario-citas-cliente.component';
import { CalendarioCitasAbogadoComponent } from './components/calendario-citas-abogado/calendario-citas-abogado.component';
import { CalendarioCitasSecretariaComponent } from './components/calendario-citas-secretaria/calendario-citas-secretaria.component';
import { GestionPagoComponent } from './components/gestion-pago/gestion-pago.component';
import { VisualizarPdfComponent } from './components/visualizar-pdf/visualizar-pdf.component';
import { HistorialExpedienteComponent } from './components/historial-expediente/historial-expediente.component';
import { ExpedienteComponent } from './components/expediente/expediente.component';
import { RegistroCitasComponent } from './components/registro-citas/registro-citas.component';
import { DocumentacionLegalComponent } from './components/documentacion-legal/documentacion-legal.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { PaymentRequiredComponent } from './components/pages/payment-required/payment-required.component';
import { ForbiddenComponent } from './components/pages/forbidden/forbidden.component';
import { BadRequestComponent } from './components/pages/bad-request/bad-request.component';
import { ConocenosComponent } from './components/pagina-principal/conocenos/conocenos.component';
import { ServiciosComponent } from './components/pagina-principal/servicios/servicios.component';
import { ContancosComponent } from './components/pagina-principal/contancos/contancos.component';
import { MapaSitioComponent } from './components/pagina-principal/mapa-sitio/mapa-sitio.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'barra', component: BarraLateralComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'documentos', component: DocumentacionLegalComponent },
  { path: 'citasRegistro', component: RegistroCitasComponent },
  { path: 'home', component: HomeComponent },
  { path: 'upload-file', component: UploadFileComponent },
  { path: 'visualizar', component: VisualizarPdfComponent },
  { path: 'cita', component: SolicitudCitaComponent },
  { path: 'historial-expedientes', component: HistorialExpedienteComponent },
  { path: 'empleado', component: CrudEmpleadoComponent },
  { path: 'gestion-cita', component: GestionCitaComponent},
  { path: 'gestion-pago', component: GestionPagoComponent },
  { path: 'gestion-cliente', component: CrudClienteComponent},
  { path: 'gestion-horario', component: GestionHorarioComponent},
  { path: 'principal', component: PrincipalComponent },
  { path: 'calendario-cliente', component: CalendarioCitasClienteComponent },
  { path: 'calendario-abogado', component: CalendarioCitasAbogadoComponent },
  { path: 'calendario-secretaria', component: CalendarioCitasSecretariaComponent },
  { path: 'expediente/:idExpediente', component: ExpedienteComponent },
  { path: 'error/400', component: BadRequestComponent },
  { path: 'error/402', component: PaymentRequiredComponent },
  { path: 'error/403', component: ForbiddenComponent },
  { path: 'principal-conocenos', component: ConocenosComponent, data: { breadcrumbLabel: 'Conócenos' } },
  { path: 'principal-servicios', component: ServiciosComponent, data: { breadcrumbLabel: 'Servicios' } },
  { path: 'principal-contactos', component: ContancosComponent, data: { breadcrumbLabel: 'Contactos' } },
  { path: 'mapa-sitio', component: MapaSitioComponent, data: {breadcrumLabel: 'Mapa del sitio'}},
  { path: 'settings', component: SettingsComponent },
  /** La ruta ** (wildcard) atrapa todas las rutas que no coincidan con las anteriores y las redirigue a home */
  { path: '**', component: NotFoundComponent },
  { path: '**', redirectTo: 'home' },
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
