import { Component, OnInit } from '@angular/core';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { CitaService } from '../../services/cita.service';
import { ServicioService } from '../../services/servicio.service';
import { FechaCita } from '../../models/fechas-citas';
import { Servicio } from '../../models/servicio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    FormsModule
  ]
})
export class PrincipalComponent implements OnInit {
  citasHoy: FechaCita[] = []; // Almacena las citas filtradas para el día actual
  servicios: Servicio[] = [];
  clientes: string[] = [];
  fechaActual: Date = new Date(); // Propiedad para la fecha actual

  constructor(
    private citaService: CitaService,
    private servicioService: ServicioService,
  ) { }

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const userId = this.getUserId();
  
    if (userId !== null) {
      if (usuario.rol === 2) { // Abogado
        this.getServiciosPorAbogado(userId);
        this.getCitasDelDia(userId);
        this.getClientesPorAbogado(userId);
      } else if (usuario.rol === 3) { // Cliente
        this.getCitasDelDiaCliente(userId);
      }
    }
  }

  getUserId(): number | null {
    if (typeof window !== 'undefined') {
      const usuarioId = localStorage.getItem('usuarioId');
      return usuarioId ? parseInt(usuarioId, 10) : null;
    }
    return null;
  }

  getServiciosPorAbogado(idAbogado: number): void {
    this.servicioService.getServiciosPorAbogado(idAbogado).subscribe(
      (res) => {
        this.servicios = res;
      },
      (err) => console.log('Error al obtener servicios por abogado:', err)
    );
  }

  getClientesPorAbogado(idAbogado: number): void {
    this.citaService.getClientesPorAbogado(idAbogado).subscribe(
      (clientes) => {
        this.clientes = clientes.map(cliente => `${cliente.nombreCliente} ${cliente.aPCliente} ${cliente.aMCliente}`);
      },
      (err) => console.log('Error al obtener clientes:', err)
    );
  }

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
              ? new Date(cita.horaInicio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })
              : '';
            const horaFinal = cita.horaFinal
              ? new Date(cita.horaFinal).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })
              : '';
  
            return {
              ...cita,
              horaInicio, // Hora de inicio en UTC
              horaFinal,  // Hora de finalización en UTC
            };
          });
  
        console.log('Citas filtradas del día actual:', this.citasHoy);
      },
      (error) => console.error('Error al obtener citas:', error)
    );
  }

  getCitasDelDiaCliente(idCliente: number): void {
    this.citaService.getCitasByCliente(idCliente).subscribe(
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
              ? new Date(cita.horaInicio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })
              : '';
            const horaFinal = cita.horaFinal
              ? new Date(cita.horaFinal).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })
              : '';
  
            return {
              ...cita,
              horaInicio, // Hora de inicio en UTC
              horaFinal,  // Hora de finalización en UTC
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
      (response) => {
        alert('Cita completada exitosamente');
        this.ngOnInit();
      },
      (error) => {
        console.error('Error al completar la cita:', error);
        alert('Ocurrió un error al completar la cita');
      }
    );
  }

  canPerformAction(requiredRole: number): boolean {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    return user.rol === requiredRole;
  }
  
}
