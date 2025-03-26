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
import { NavigationHistoryService } from './services/navigation-history.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { breadcrumbLabel: 'Inicio de sesión' } },
  { path: 'barra', component: BarraLateralComponent, data: { breadcrumbLabel: 'Barra lateral' } },
  { path: 'register', component: RegisterComponent, data: { breadcrumbLabel: 'Registro' } },
  { path: 'documentos', component: DocumentacionLegalComponent, data: { breadcrumbLabel: 'Documentación legal' } },
  { path: 'citasRegistro', component: RegistroCitasComponent, data: { breadcrumbLabel: 'Registro de citas' } },
  { path: 'home', component: HomeComponent, data: { breadcrumbLabel: 'Inicio' } },
  { path: 'crear-expediente', component: UploadFileComponent, data: { breadcrumbLabel: 'Subir expediente' } },
  { path: 'visualizar-expediente', component: VisualizarPdfComponent, data: { breadcrumbLabel: 'Visualizar expediente' } },
  { path: 'cita', component: SolicitudCitaComponent, data: { breadcrumbLabel: 'Solicitar cita' } },
  { path: 'historial-expedientes', component: HistorialExpedienteComponent, data: { breadcrumbLabel: 'Historial de expedientes' } },
  { path: 'empleado', component: CrudEmpleadoComponent, data: { breadcrumbLabel: 'Gestión de empleados' } },
  { path: 'gestion-cita', component: GestionCitaComponent, data: { breadcrumbLabel: 'Gestión de citas' } },
  { path: 'gestion-pago', component: GestionPagoComponent, data: { breadcrumbLabel: 'Gestión de pagos' } },
  { path: 'gestion-cliente', component: CrudClienteComponent, data: { breadcrumbLabel: 'Gestión de clientes' } },
  { path: 'gestion-horario', component: GestionHorarioComponent, data: { breadcrumbLabel: 'Gestión de horarios' } },
  { path: 'principal', component: PrincipalComponent, data: { breadcrumbLabel: 'Principal' } },
  { path: 'calendario-cliente', component: CalendarioCitasClienteComponent, data: { breadcrumbLabel: 'Calendario (Cliente)' } },
  { path: 'calendario-abogado', component: CalendarioCitasAbogadoComponent, data: { breadcrumbLabel: 'Calendario (Abogado)' } },
  { path: 'calendario-secretaria', component: CalendarioCitasSecretariaComponent, data: { breadcrumbLabel: 'Calendario (Secretaría)' } },
  { path: 'expediente/:idExpediente', component: ExpedienteComponent, data: { breadcrumbLabel: 'Expediente' } },
  { path: 'error/400', component: BadRequestComponent, data: { breadcrumbLabel: 'Error 400' } },
  { path: 'error/402', component: PaymentRequiredComponent, data: { breadcrumbLabel: 'Error 402' } },
  { path: 'error/403', component: ForbiddenComponent, data: { breadcrumbLabel: 'Error 403' } },
  { path: 'settings', component: SettingsComponent, data: { breadcrumbLabel: 'Configuración' } },
  
  // Páginas principales
  { path: 'principal-conocenos', component: ConocenosComponent, data: { breadcrumbLabel: 'Conócenos' } },
  { path: 'principal-servicios', component: ServiciosComponent, data: { breadcrumbLabel: 'Servicios' } },
  { path: 'principal-contactos', component: ContancosComponent, data: { breadcrumbLabel: 'Contactos' } },
  { path: 'mapa-sitio', component: MapaSitioComponent, data: { breadcrumbLabel: 'Mapa del Sitio' } },
  
  // Rutas comodín
  { path: '**', component: NotFoundComponent, data: { breadcrumbLabel: 'Página no encontrada' } },
  { path: '**', redirectTo: 'home' }
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
  providers: [NavigationHistoryService],
})
export class AppRoutingModule { }
