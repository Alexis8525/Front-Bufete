import { Component, OnInit } from '@angular/core';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitaService } from '../../services/cita.service';

interface Appointment {
  date: number;       // Día del mes
  month: number;      // Mes (0 = Enero, 1 = Febrero, etc.)
  year: number;       // Año completo, por ejemplo, 2024
  description: string;
}

@Component({
  selector: 'app-calendario-citas-cliente',
  templateUrl: './calendario-citas-cliente.component.html',
  styleUrls: ['./calendario-citas-cliente.component.css'],
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    FormsModule,
  ]
})
export class CalendarioCitasClienteComponent implements OnInit {
  diasDelMes: number[] = [];
  mesActual: number;
  anioActual: number;
  nombreMesActual: string;
  nombresDias: string[] = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ];

  // Lista de citas con mes y año específico
  citas: Appointment[] = [
    { date: 5, month: 0, year: 2024, description: 'Cita con el cliente A' },
    { date: 10, month: 10, year: 2024, description: 'Revisión de proyecto' },
    { date: 15, month: 2, year: 2024, description: 'Presentación final' },
  ];

  constructor(
    public citaService: CitaService,
  ) {
    const fecha = new Date();
    this.mesActual = fecha.getMonth();
    this.anioActual = fecha.getFullYear();
    this.nombreMesActual = this.obtenerNombreMes();
  }

  ngOnInit(): void {
    const userId = this.getUserId();
    if (userId !== null) {
      this.getCitasByCliente(userId);
    }
    this.generarDiasDelMes();
  }

  // Recuperar el idUsuario en sesión
  getUserId(): number | null {
    if (typeof window !== 'undefined') {
      const usuarioId = localStorage.getItem('usuarioId');
      return usuarioId ? parseInt(usuarioId, 10) : null;
    }
    return null;
  }

  getCitasByCliente(idCliente: number) {
    this.citaService.getCitasByCliente(idCliente).subscribe(
      (citas) => {
        // Imprimir en consola las citas obtenidas
        console.log('Citas recuperadas:', citas);
  
        this.citas = citas.map(cita => ({
          date: new Date(cita.fechaAgenda).getDate(),
          month: new Date(cita.fechaAgenda).getMonth(),
          year: new Date(cita.fechaAgenda).getFullYear(),
          description: cita.motivo
        }));
      },
      (error) => {
        console.error('Error al obtener las citas del cliente:', error);
      }
    );
  }
  

  generarDiasDelMes(): void {
    const primerDia = new Date(this.anioActual, this.mesActual, 1).getDay();
    const diasEnElMes = new Date(this.anioActual, this.mesActual + 1, 0).getDate();
    
    // Ajustar para que el calendario empiece el lunes
    const inicioCalendario = (primerDia === 0) ? 6 : primerDia - 1;

    this.diasDelMes = Array.from({ length: 42 }, (_, i) => {
      if (i < inicioCalendario || i >= inicioCalendario + diasEnElMes) {
        return 0; // Día fuera del mes
      }
      return i - inicioCalendario + 1; // Día del mes
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

  // Verifica si un día tiene citas en el mes y año actual
  tieneCita(dia: number): Appointment | undefined {
    return this.citas.find(
      cita => cita.date === dia && cita.month === this.mesActual && cita.year === this.anioActual
    );
  }
}
