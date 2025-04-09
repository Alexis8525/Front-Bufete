import { Component, OnInit } from '@angular/core';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { CitaService } from '../../services/cita.service';
import { ServicioService } from '../../services/servicio.service';
import { AbogadoCitasStrategy } from '../../patterns/strategies/abogado-citas-strategy';
import { ClienteCitasStrategy } from '../../patterns/strategies/cliente-citas-strategy';
import { CitasContext } from '../../patterns/strategies/citas-context';
import { FechaCita } from '../../models/fechas-citas';
import { CommonModule, DatePipe } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { SecretariaCitasStrategy } from '../../patterns/strategies/secretaria-citas-strategy';
import { CitaAdaptada } from '../../models/cita-adaptada';
import { formatDate } from '@angular/common';
import { ConcreteComponent } from '../../patterns/decorators/concrete-component';
import { RoleValidationDecorator } from '../../patterns/decorators/role-validation-decorator';
import { StateUpdateDecorator } from '../../patterns/decorators/state-update-decorator';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { BarraBusquedaHomeComponent } from '../pagina-principal/barra-busqueda-home/barra-busqueda-home.component';
import { NavigationHistoryService } from '../../services/navigation-history.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    DatePipe,
    BreadcrumbsComponent,
    FormsModule,
    RouterModule,
    BarraBusquedaHomeComponent // Agregar el componente de búsqueda
  ],
})
export class PrincipalComponent implements OnInit {
  citasHoy: CitaAdaptada[] = [];
  fechaActual: Date = new Date();
  loading: boolean = true;
  usuario: any = {};

  // Elimina las palabras clave ya que ahora están en BarraBusquedaHomeComponent

  constructor(
    private citaService: CitaService,
    private servicioService: ServicioService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private navService: NavigationHistoryService
  ) {}

  ngOnInit(): void {
    if (!this.localStorageService.isBrowser()) {
      return;
    }

    this.usuario = JSON.parse(this.localStorageService.getItem('usuario') || '{}');
    const userId = parseInt(this.localStorageService.getItem('usuarioId') || '0', 10);

    const citasContext = new CitasContext<CitaAdaptada>();

    if (this.usuario.rol === 1) { // Secretaria
      citasContext.setStrategy(
        new SecretariaCitasStrategy(this.citaService, (citas) => {
          const citasFiltradas = this.filtrarCitasDelDia(citas);
          this.citasHoy = this.normalizarHorasCitas(citasFiltradas);
          this.loading = false;
        })
      );
    } else if (this.usuario.rol === 2) { // Abogado
      citasContext.setStrategy(
        new AbogadoCitasStrategy(this.citaService, (citas) => {
          const citasFiltradas = this.filtrarCitasDelDia(citas);
          this.citasHoy = this.normalizarHorasCitas(citasFiltradas);
          this.loading = false;
        })
      );
    } else if (this.usuario.rol === 3) { // Cliente
      citasContext.setStrategy(
        new ClienteCitasStrategy(this.citaService, (citas) => {
          const citasFiltradas = this.filtrarCitasDelDia(citas);
          this.citasHoy = this.normalizarHorasCitas(citasFiltradas);
          this.loading = false;
        })
      );
    }

    citasContext.executeStrategy(userId)
      .catch((error) => console.error('Error al cargar citas:', error))
      .finally(() => {
        this.loading = false;
      });
  }

  // Elimina el método buscarGlobal() ya que está en BarraBusquedaHomeComponent

  filtrarCitasDelDia(citas: CitaAdaptada[]): CitaAdaptada[] {
    const hoy = new Date();
    const diaActual = hoy.getUTCDate();
    const mesActual = hoy.getUTCMonth();
    const anioActual = hoy.getUTCFullYear();

    return citas.filter((cita) => {
      const fechaCita = new Date(cita.fechaCita);
      const diaCita = fechaCita.getUTCDate();
      const mesCita = fechaCita.getUTCMonth();
      const anioCita = fechaCita.getUTCFullYear();

      const estadoValido = cita.estadoCita === 'programada';
      const fechaValida = diaCita === diaActual && mesCita === mesActual && anioCita === anioActual;

      return estadoValido && fechaValida;
    });
  }

  normalizarHorasCitas(citas: CitaAdaptada[]): CitaAdaptada[] {
    return citas.map((cita) => ({
      ...cita,
      horaInicio: this.extraerHora(cita.horaInicio),
      horaFinal: this.extraerHora(cita.horaFinal),
    }));
  }

  extraerHora(hora: string | Date): string {
    const date = typeof hora === 'string' ? new Date(hora) : hora;
    return formatDate(date, 'h:mm a', 'en-US');
  }

  atenderCita(idCita: number | undefined): void {
    if (idCita === undefined) {
      console.error('El ID de la cita es indefinido.');
      return;
    }

    const baseComponent = new ConcreteComponent();
    const roleValidationDecorator = new RoleValidationDecorator(baseComponent, this.usuario.rol);
    const stateUpdateDecorator = new StateUpdateDecorator(
      roleValidationDecorator,
      this.citaService,
      () => this.ngOnInit()
    );

    stateUpdateDecorator.operation(idCita);
  }

  logout(): void {
    this.router.navigate(['/home']).then(success => {
      if (success) {
        window.location.reload(); // Recargar para limpiar el estado
      } else {
        // Si /home falla, intentar con /inicio
        this.router.navigate(['/inicio']).then(() => window.location.reload());
      }
    });
  }
}