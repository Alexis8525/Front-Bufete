import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { ServicioService } from '../../services/servicio.service';
import { FechaCita } from '../../models/fechas-citas';
import { Servicio } from '../../models/servicio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BarraLateralComponent
  ]
})
export class PrincipalComponent implements OnInit {
  citasHoy: FechaCita[] = []; // Almacena las citas filtradas para el día actual
  servicios: Servicio[] = []; // Lista de servicios del abogado
  clientes: string[] = []; // Lista de clientes asociados al abogado
  fechaActual: Date = new Date(); // Propiedad para la fecha actual

  // Variables para verificar el rol
  isAbogado: boolean = false;
  isCliente: boolean = false;

  constructor(
    private citaService: CitaService,
    private servicioService: ServicioService
  ) {}

  ngOnInit(): void {
    // Determinar el rol del usuario
    const rol = this.getRolUsuario();
    this.isAbogado = rol === 'abogado';
    this.isCliente = rol === 'cliente';

    // Lógica para abogados
    if (this.isAbogado) {
      const userId = this.getUserId();
      if (userId) {
        this.getServiciosPorAbogado(userId);
        this.getCitasDelDia(userId);
        this.getClientesPorAbogado(userId);
      }
    }

    // Lógica para clientes
    if (this.isCliente) {
      console.log('Bienvenido, cliente.');
    }
  }

  // Método para obtener el rol del usuario desde el localStorage
  getRolUsuario(): string {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    return usuario?.rol === 2 ? 'abogado' : usuario?.rol === 3 ? 'cliente' : '';
  }

  // Método para obtener el ID del usuario desde el localStorage
  getUserId(): number | null {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    return usuario?.id || null;
  }

  // Obtener los servicios del abogado
  getServiciosPorAbogado(idAbogado: number): void {
    this.servicioService.getServiciosPorAbogado(idAbogado).subscribe(
      (res) => (this.servicios = res),
      (err) => console.error('Error al obtener servicios por abogado:', err)
    );
  }

  // Obtener los clientes del abogado
  getClientesPorAbogado(idAbogado: number): void {
    this.citaService.getClientesPorAbogado(idAbogado).subscribe(
      (clientes) => {
        this.clientes = clientes.map(
          (cliente) => `${cliente.nombreCliente} ${cliente.aPCliente} ${cliente.aMCliente}`
        );
      },
      (err) => console.error('Error al obtener clientes:', err)
    );
  }

  // Obtener las citas del día para el abogado
  getCitasDelDia(idAbogado: number): void {
    this.citaService.getCitasByAbogado(idAbogado).subscribe(
      (citas: FechaCita[]) => {
        const hoy = new Date();
        const diaActual = hoy.getUTCDate();
        const mesActual = hoy.getUTCMonth();
        const anioActual = hoy.getUTCFullYear();

        // Filtrar citas del día actual excluyendo estados 'cancelado' y 'completado'
        this.citasHoy = citas
          .filter((cita) => {
            const fechaCita = new Date(cita.fechaCita);
            return (
              fechaCita.getUTCDate() === diaActual &&
              fechaCita.getUTCMonth() === mesActual &&
              fechaCita.getUTCFullYear() === anioActual &&
              cita.estadoCita !== 'cancelada' &&
              cita.estadoCita !== 'completada'
            );
          })
          .map((cita) => {
            const horaInicio = cita.horaInicio
              ? new Date(cita.horaInicio).toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                  timeZone: 'UTC',
                })
              : '';
            const horaFinal = cita.horaFinal
              ? new Date(cita.horaFinal).toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                  timeZone: 'UTC',
                })
              : '';

            return {
              ...cita,
              horaInicio, // Hora de inicio en UTC
              horaFinal, // Hora de finalización en UTC
            };
          });

        console.log('Citas filtradas del día actual:', this.citasHoy);
      },
      (error) => console.error('Error al obtener citas:', error)
    );
  }

  // Método para completar una cita
  atenderCita(idCita: number): void {
    this.citaService.completarCita(idCita).subscribe(
      () => {
        alert('Cita completada exitosamente');
        this.ngOnInit(); // Recargar las citas del día
      },
      (error) => {
        console.error('Error al completar la cita:', error);
        alert('Ocurrió un error al completar la cita');
      }
    );
  }
}
