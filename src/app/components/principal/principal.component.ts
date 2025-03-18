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
import { formatDate } from '@angular/common'; // Importar el helper para formateo
import { ConcreteComponent } from '../../patterns/decorators/concrete-component';
import { RoleValidationDecorator } from '../../patterns/decorators/role-validation-decorator';
import { StateUpdateDecorator } from '../../patterns/decorators/state-update-decorator';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    DatePipe,
    RouterModule,
    FormsModule
  ],
})
export class PrincipalComponent implements OnInit {
  citasHoy: CitaAdaptada[] = [];
  fechaActual: Date = new Date();
  loading: boolean = true;
  usuario: any = {}; // Información del usuario actual
  terminoBusqueda: string = '';

  constructor(
    private citaService: CitaService,
    private servicioService: ServicioService,
    private localStorageService: LocalStorageService
  ) {}


  buscar() {
    if (this.terminoBusqueda.trim() !== '') {
      console.log('Buscando:', this.terminoBusqueda);
  
      // Filtrar citas
      this.citasHoy = this.citasHoy.filter(cita =>
        cita.cliente?.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        cita.abogado?.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        cita.nombreServicio.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        cita.motivo.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
    } else {
      // Volver a cargar citas si el campo de búsqueda está vacío
      this.ngOnInit();
    }
  }
  

  ngOnInit(): void {
    if (!this.localStorageService.isBrowser()) {
      console.error('localStorage no está disponible en este entorno.');
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

  // Filtra citas para mostrar solo las del día actual
  filtrarCitasDelDia(citas: CitaAdaptada[]): CitaAdaptada[] {
    const hoy = new Date();
    const diaActual = hoy.getUTCDate(); // Usar UTC para evitar desfases
    const mesActual = hoy.getUTCMonth(); // Mes también en UTC
    const anioActual = hoy.getUTCFullYear();

    console.log('Fecha actual en UTC (sin horas):', {
      diaActual,
      mesActual,
      anioActual,
    });

    return citas.filter((cita) => {
      const fechaCita = new Date(cita.fechaCita); // Convertimos la fecha de la cita
      const diaCita = fechaCita.getUTCDate(); // Extraemos día en UTC
      const mesCita = fechaCita.getUTCMonth(); // Extraemos mes en UTC
      const anioCita = fechaCita.getUTCFullYear(); // Extraemos año en UTC

      const estadoValido = cita.estadoCita === 'programada'; // Solo citas programadas
      const fechaValida = diaCita === diaActual && mesCita === mesActual && anioCita === anioActual;

      console.log(`Evaluando cita: ${cita.idCita}`, {
        fechaCita: fechaCita.toISOString(),
        diaCita,
        mesCita,
        anioCita,
        estadoValido,
        fechaValida,
      });

      return estadoValido && fechaValida;
    });
  }

  normalizarHorasCitas(citas: CitaAdaptada[]): CitaAdaptada[] {
    return citas.map((cita) => ({
      ...cita,
      horaInicio: this.extraerHora(cita.horaInicio), // Extraer hora correctamente
      horaFinal: this.extraerHora(cita.horaFinal),   // Extraer hora correctamente
    }));
  }

  // Función para extraer solo la hora de un string o un objeto Date
  extraerHora(hora: string | Date): string {
    const date = typeof hora === 'string' ? new Date(hora) : hora; // Asegura que sea un objeto Date
    return formatDate(date, 'h:mm a', 'en-US'); // Formatea la hora (12h con AM/PM)
  }

  // Verifica si el usuario tiene el rol necesario para realizar una acción
  canPerformAction(requiredRole: number): boolean {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    return user.rol === requiredRole;
  }

  // Lógica para atender una cita
  atenderCita(idCita: number | undefined): void {
    if (idCita === undefined) {
      console.error('El ID de la cita es indefinido.');
      return;
    }
  
    // Crear el componente base
    const baseComponent = new ConcreteComponent();
  
    // Aplicar el decorador para validar el rol
    const roleValidationDecorator = new RoleValidationDecorator(baseComponent, this.usuario.rol);
  
    // Aplicar el decorador para actualizar el estado de la cita
    const stateUpdateDecorator = new StateUpdateDecorator(
      roleValidationDecorator,
      this.citaService,
      () => this.ngOnInit() // O un método específico como this.cargarCitas()
    );
      
    // Ejecutar la operación con decoradores
    stateUpdateDecorator.operation(idCita);
  }
  
  
}
