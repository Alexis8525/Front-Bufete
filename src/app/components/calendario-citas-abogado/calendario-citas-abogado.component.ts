import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FechaCita } from '../../models/fechas-citas';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { CitaService } from '../../services/cita.service';
import { DetalleCitaClienteComponent } from '../modals/detalle-cita-cliente/detalle-cita-cliente.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Extendemos FechaCita para incluir las propiedades adicionales
interface FechaCitaExtendida extends FechaCita {
  date: number;
  month: number;
  year: number;
}

interface Appointment {
  date: number;
  month: number;
  year: number;
  description: string;
}

@Component({
  selector: 'app-calendario-citas-abogado',
  templateUrl: './calendario-citas-abogado.component.html',
  styleUrls: ['./calendario-citas-abogado.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BarraLateralComponent,
  ]
})
export class CalendarioCitasAbogadoComponent implements OnInit {

  diasDelMes: (number | null)[] = [];
  mesActual: number;
  anioActual: number;
  nombreMesActual: string;
  nombresDias: string[] = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ];

  citas: FechaCitaExtendida[] = [];  // Arreglo de objetos FechaCita completos
  appointments: Appointment[] = []; // Arreglo de objetos Appointment para el calendario

  constructor(
    public citaService: CitaService,
    public modalService: NgbModal,
  ) { 
    const fecha = new Date();
    this.mesActual = fecha.getMonth();
    this.anioActual = fecha.getFullYear();
    this.nombreMesActual = this.obtenerNombreMes();
  }

  ngOnInit() : void{
    const userId = this.getUserId();
    if (userId !== null) {
      this.getCitasByAbogado(userId);
    }
    this.generarDiasDelMes();
  } 

  getUserId(): number | null {
    if (typeof window !== 'undefined') {
      const usuarioId = localStorage.getItem('usuarioId');
      return usuarioId ? parseInt(usuarioId, 10) : null;
    }
    return null;
  }

  getCitasByAbogado(idCliente: number): void {
    this.citaService.getCitasByAbogado(idCliente).subscribe(
      (citas: FechaCita[]) => {
        this.citas = citas.map((cita) => {
          // Agrega `date`, `month`, y `year` a cada `FechaCita` como `FechaCitaExtendida`
          const fecha = cita.fechaCita || cita.fechaAgenda;
          const parsedDate = fecha ? new Date(fecha) : null;

          return {
            ...cita,
            date: parsedDate?.getUTCDate() ?? NaN,
            month: parsedDate?.getUTCMonth() ?? NaN,
            year: parsedDate?.getUTCFullYear() ?? NaN,
          } as FechaCitaExtendida;
        });

        // Genera `appointments` solo con los datos mínimos
        this.appointments = this.citas.map((cita) => ({
          date: cita.date,
          month: cita.month,
          year: cita.year,
          description: cita.motivo,
        }));
      }
    );
  }
  
  generarDiasDelMes(): void {
    const primerDia = new Date(this.anioActual, this.mesActual, 1).getDay();
    const diasEnElMes = new Date(this.anioActual, this.mesActual + 1, 0).getDate();
    const inicioCalendario = (primerDia === 0) ? 6 : primerDia - 1;

    this.diasDelMes = Array.from({ length: 42 }, (_, i) => {
      if (i < inicioCalendario || i >= inicioCalendario + diasEnElMes) {
        return null;
      }
      return i - inicioCalendario + 1;
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

  tieneCitas(dia: number | null): Appointment[] {
    if (dia === null || dia === 0) return [];
    return this.appointments.filter(
      cita => cita.date === dia && cita.month === this.mesActual && cita.year === this.anioActual
    );
  }  

  openCitaModal(cita: Appointment): void {
    // Encuentra la cita completa en `citas` utilizando los valores calculados de `date`, `month`, `year`
    const citaCompleta = this.citas.find(
      c => c.date === cita.date && c.month === cita.month && c.year === cita.year && c.motivo === cita.description
    );

    if (citaCompleta) {
      const modalRef = this.modalService.open(DetalleCitaClienteComponent);
      modalRef.componentInstance.cita = citaCompleta;  // Pasa el objeto completo de `FechaCita` al modal
    } else {
      console.error("No se encontró la cita completa para el modal");
    }
  }
}

