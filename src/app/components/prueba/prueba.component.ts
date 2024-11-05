import { Component, OnInit } from '@angular/core';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Appointment {
  date: number;
  description: string;
}

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {
  diasDelMes: number[] = [];
  mesActual: number;
  anioActual: number;
  nombreMesActual: string;
  nombresDias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  disponibilidadDias: any = {}; // Objeto para almacenar la disponibilidad de cada día
  diasConCitasDisponibles: number[] = [1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26, 29]; // Días con citas disponibles
  horasDisponibles: string[] = ['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM']; // Horas disponibles
  diaSeleccionado: number | null = null;
  horasDelDiaSeleccionado: string[] = [];
  horaSeleccionada: string | null = null;

  constructor() {
    const fecha = new Date();
    this.mesActual = fecha.getMonth();
    this.anioActual = fecha.getFullYear();
    this.nombreMesActual = this.obtenerNombreMes();
  }

  ngOnInit(): void {
    this.generarDiasDelMes();
    this.definirDisponibilidadDias();
  }

  // Genera los días del mes en el calendario
  generarDiasDelMes(): void {
    const primerDia = new Date(this.anioActual, this.mesActual, 1).getDay();
    const diasEnElMes = new Date(this.anioActual, this.mesActual + 1, 0).getDate();
    
    // Ajustar para que empiece el lunes (0 para domingo)
    const inicioCalendario = (primerDia === 0) ? 6 : primerDia - 1;

    this.diasDelMes = Array.from({ length: 42 }, (_, i) => {
      if (i < inicioCalendario || i >= inicioCalendario + diasEnElMes) {
        return 0; // Cambiar null por 0
      }
      return i - inicioCalendario + 1; // Días del mes
    });
  }

  obtenerNombreMes(): string {
    return new Date(this.anioActual, this.mesActual).toLocaleString('es-ES', { month: 'long' });
  }

  cambiarMes(incremento: number): void {
    this.mesActual += incremento;
    if (this.mesActual < 0) {
      this.mesActual = 11;
      this.anioActual--;
    } else if (this.mesActual > 11) {
      this.mesActual = 0;
      this.anioActual++;
    }
    this.nombreMesActual = this.obtenerNombreMes();
    this.generarDiasDelMes();
  }

  // Establecer la disponibilidad de los días
  definirDisponibilidadDias(): void {
    // Ejemplo de días con disponibilidad
    this.disponibilidadDias = {
      1: 'alta', // Alta disponibilidad
      2: 'baja', // Poca disponibilidad
      5: 'nada', // Sin disponibilidad
      7: 'nada', // Día sin servicio (Domingo)
      10: 'alta',
      15: 'baja',
      17: 'alta',
      20: 'nada',
      22: 'alta',
      25: 'baja',
      30: 'nada'
    };
  }

  // Función que retorna el color según la disponibilidad
  obtenerColorDia(dia: number, diaSemana: number): string {
    // Si el día es domingo (diaSemana = 6), marcarlo en gris
    if (diaSemana === 6) {
      return 'gris'; // Día sin servicio (Domingo)
    }

    const disponibilidad = this.disponibilidadDias[dia];

    switch (disponibilidad) {
      case 'alta': return 'verde'; // Alta disponibilidad
      case 'baja': return 'amarillo'; // Poca disponibilidad
      case 'nada': return 'rojo'; // Sin disponibilidad
      default: return 'gris'; // Día sin servicio (Domingo o día no trabajado)
    }
  }

  // Función que maneja la selección de un día
  seleccionarDia(dia: number): void {
    if (this.disponibilidadDias[dia] !== 'nada') {
      this.diaSeleccionado = dia;
      this.horasDelDiaSeleccionado = this.horasDisponibles;
      this.horaSeleccionada = null; // Resetear la hora seleccionada
    }
  }

  deseleccionarDia(): void {
    this.diaSeleccionado = null;
    this.horasDelDiaSeleccionado = [];
    this.horaSeleccionada = null;
  }
}
