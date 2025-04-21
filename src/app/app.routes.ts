import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Componentes principales
import { HomeComponent } from './components/pagina-principal/home/home.component';
import { LoginComponent } from './components/pagina-principal/login/login.component';
import { RegisterComponent } from './components/pagina-principal/register/register.component';
import { RecuperacionContraseñaComponent } from './components/pagina-principal/recuperacion-contraseña/recuperacion-contraseña.component';
import { RestablecerContrasenaComponent } from './components/pagina-principal/restablecer-contrasena/restablecer-contrasena.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { SettingsComponent } from './components/settings/settings.component';

// Informativas
import { ConocenosComponent } from './components/pagina-principal/conocenos/conocenos.component';
import { ServiciosComponent } from './components/pagina-principal/servicios/servicios.component';
import { ContancosComponent } from './components/pagina-principal/contancos/contancos.component';
import { MapaSitioComponent } from './components/pagina-principal/mapa-sitio/mapa-sitio.component';

// Gestión
import { CrudEmpleadoComponent } from './components/crud-empleado/crud-empleado.component';
import { CrudClienteComponent } from './components/crud-cliente/crud-cliente.component';
import { GestionHorarioComponent } from './components/gestion-horario/gestion-horario.component';
import { GestionPagoComponent } from './components/gestion-pago/gestion-pago.component';
import { GestionCitaComponent } from './components/gestion-cita/gestion-cita.component';

// Citas
import { SolicitudCitaComponent } from './components/solicitud-cita/solicitud-cita.component';
import { RegistroCitasComponent } from './components/registro-citas/registro-citas.component';
import { CalendarioCitasClienteComponent } from './components/calendario-citas-cliente/calendario-citas-cliente.component';
import { CalendarioCitasAbogadoComponent } from './components/calendario-citas-abogado/calendario-citas-abogado.component';
import { CalendarioCitasSecretariaComponent } from './components/calendario-citas-secretaria/calendario-citas-secretaria.component';

// Expedientes
import { UploadFileComponent } from './components/Expedientes/upload-file/upload-file.component';
import { VisualizarPdfComponent } from './components/Expedientes/visualizar-pdf/visualizar-pdf.component';
import { HistorialExpedienteComponent } from './components/historial-expediente/historial-expediente.component';
import { ExpedienteComponent } from './components/Expedientes/expediente/expediente.component';

// Navegación
import { NavbarComponent } from './components/navbar/navbar.component';
import { BarraLateralComponent } from './components/barra-lateral/barra-lateral.component';

// Páginas de error
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { BadRequestComponent } from './components/pages/bad-request/bad-request.component';
import { ForbiddenComponent } from './components/pages/forbidden/forbidden.component';
import { PaymentRequiredComponent } from './components/pages/payment-required/payment-required.component';

// Servicio
import { NavigationHistoryService } from './services/navigation-history.service';

export const routes: Routes = [
  // ✅ Ruta por defecto: redirige a home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Páginas principales
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recuperar-contrasena', component: RecuperacionContraseñaComponent },
  { path: 'restablecer-contrasena/:token', component: RestablecerContrasenaComponent },
  { path: 'restablecer', component: RestablecerContrasenaComponent},
  { path: 'principal', component: PrincipalComponent },
  { path: 'settings', component: SettingsComponent },

  // Informativas
  { path: 'principal-conocenos', component: ConocenosComponent },
  { path: 'principal-servicios', component: ServiciosComponent },
  { path: 'principal-contactos', component: ContancosComponent },
  { path: 'mapa-sitio', component: MapaSitioComponent },

  // Gestión
  { path: 'empleado', component: CrudEmpleadoComponent },
  { path: 'gestion-cliente', component: CrudClienteComponent },
  { path: 'gestion-horario', component: GestionHorarioComponent },
  { path: 'gestion-pago', component: GestionPagoComponent },
  { path: 'gestion-cita', component: GestionCitaComponent },

  // Citas
  { path: 'cita', component: SolicitudCitaComponent },
  { path: 'citasRegistro', component: RegistroCitasComponent },
  { path: 'calendario-cliente', component: CalendarioCitasClienteComponent },
  { path: 'calendario-abogado', component: CalendarioCitasAbogadoComponent },
  { path: 'calendario-secretaria', component: CalendarioCitasSecretariaComponent },

  // Expedientes
  { path: 'crear-expediente', component: UploadFileComponent },
  { path: 'visualizar-expediente', component: VisualizarPdfComponent },
  { path: 'historial-expedientes', component: HistorialExpedienteComponent },
  { path: 'expediente/:idExpediente', component: ExpedienteComponent },

  // Barra y navegación
  { path: 'barra', component: BarraLateralComponent },
  { path: 'navbar', component: NavbarComponent },

  // Errores
  { path: 'error/400', component: BadRequestComponent },
  { path: 'error/402', component: PaymentRequiredComponent },
  { path: 'error/403', component: ForbiddenComponent },

  // Ruta comodín
  { path: '**', component: NotFoundComponent }
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NavbarComponent,
    UploadFileComponent
  ],
  exports: [UploadFileComponent],
  providers: [NavigationHistoryService],
})
export class AppRoutingModule {}
