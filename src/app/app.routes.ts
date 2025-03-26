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
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { PaymentRequiredComponent } from './components/pages/payment-required/payment-required.component';
import { ForbiddenComponent } from './components/pages/forbidden/forbidden.component';
import { BadRequestComponent } from './components/pages/bad-request/bad-request.component';
import { ConocenosComponent } from './components/pagina-principal/conocenos/conocenos.component';
import { ServiciosComponent } from './components/pagina-principal/servicios/servicios.component';
import { ContancosComponent } from './components/pagina-principal/contancos/contancos.component';
import { MapaSitioComponent } from './components/pagina-principal/mapa-sitio/mapa-sitio.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { breadcrumbLabel: 'Login' } },
  { path: 'barra', component: BarraLateralComponent, data: { breadcrumbLabel: 'Barra Lateral' } },
  { path: 'register', component: RegisterComponent, data: { breadcrumbLabel: 'Registro' } },
  { path: 'taps', component: TapsComponent, data: { breadcrumbLabel: 'Taps' } },
  { path: 'DatosPartes', component: DatosPartesComponent, data: { breadcrumbLabel: 'Datos Partes' } },
  { path: 'documentos', component: DocumentacionLegalComponent, data: { breadcrumbLabel: 'Documentos' } },
  { path: 'citasRegistro', component: RegistroCitasComponent, data: { breadcrumbLabel: 'Registro de Citas' } },
  { path: 'informacion', component: InformacionGeneralComponent, data: { breadcrumbLabel: 'Información General' } },
  { path: 'home', component: HomeComponent, data: { breadcrumbLabel: 'Inicio' } },
  { path: 'upload-file', component: UploadFileComponent, data: { breadcrumbLabel: 'Subir Archivo' } },
  { path: 'visualizar', component: VisualizarPdfComponent, data: { breadcrumbLabel: 'Visualizar PDF' } },
  { path: 'document-viewer', component: DocumentViewerComponent, data: { breadcrumbLabel: 'Visor de Documentos' } },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'cita', component: SolicitudCitaComponent, data: { breadcrumbLabel: 'Solicitud de Cita' } },
  { path: 'historial-expedientes', component: HistorialExpedienteComponent, data: { breadcrumbLabel: 'Historial de Expedientes' } },
  { path: 'empleado', component: CrudEmpleadoComponent, data: { breadcrumbLabel: 'Gestión de Empleados' } },
  { path: 'prueba', component: PruebaComponent, data: { breadcrumbLabel: 'Prueba' } },
  { path: 'gestion-cita', component: GestionCitaComponent, data: { breadcrumbLabel: 'Gestión de Citas' } },
  { path: 'gestion-pago', component: GestionPagoComponent, data: { breadcrumbLabel: 'Gestión de Pagos' } },
  { path: 'gestion-cliente', component: CrudClienteComponent, data: { breadcrumbLabel: 'Gestión de Clientes' } },
  { path: 'gestion-horario', component: GestionHorarioComponent, data: { breadcrumbLabel: 'Gestión de Horarios' } },
  { path: 'principal', component: PrincipalComponent, data: { breadcrumbLabel: 'Principal' } },
  { path: 'calendario-cliente', component: CalendarioCitasClienteComponent, data: { breadcrumbLabel: 'Calendario Cliente' } },
  { path: 'calendario-abogado', component: CalendarioCitasAbogadoComponent, data: { breadcrumbLabel: 'Calendario Abogado' } },
  { path: 'calendario-secretaria', component: CalendarioCitasSecretariaComponent, data: { breadcrumbLabel: 'Calendario Secretaría' } },
  { path: 'expediente/:idExpediente', component: ExpedienteComponent, data: { breadcrumbLabel: 'Expediente' } },
  { path: 'error/400', component: BadRequestComponent, data: { breadcrumbLabel: 'Error 400' } },
  { path: 'error/402', component: PaymentRequiredComponent, data: { breadcrumbLabel: 'Error 402' } },
  { path: 'error/403', component: ForbiddenComponent, data: { breadcrumbLabel: 'Error 403' } },
  
  // Páginas principales
  { path: 'principal-conocenos', component: ConocenosComponent, data: { breadcrumbLabel: 'Conócenos' } },
  { path: 'principal-servicios', component: ServiciosComponent, data: { breadcrumbLabel: 'Servicios' } },
  { path: 'principal-contactos', component: ContancosComponent, data: { breadcrumbLabel: 'Contactos' } },
  { path: 'mapa-sitio', component: MapaSitioComponent, data: { breadcrumbLabel: 'Mapa del Sitio' } },
  
  /** La ruta ** (wildcard) atrapa todas las rutas que no coincidan con las anteriores y las redirige a home */
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
