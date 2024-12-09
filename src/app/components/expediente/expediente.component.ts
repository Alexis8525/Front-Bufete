import { Component, OnInit } from '@angular/core';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Expediente } from '../../models/expediente';
import { ExpedienteService } from '../../services/expediente.service';
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css'],
  standalone: true,
  imports: [
    BarraLateralComponent,
    FormsModule,
    CommonModule
  ],
})
export class ExpedienteComponent implements OnInit {

  numeroExpediente: string = 'EXP0001'; // Número de expediente a buscar
  expediente: Expediente | null = null; // Información del expediente
  demandantes: any[] = []; // Lista de demandantes
  demandados: any[] = []; // Lista de demandados
  terceros: any[] = []; // Lista de terceros relacionados
  citasCompletadas: any[] = []; // Almacena las citas completadas del expediente


  constructor(
    private expedienteService: ExpedienteService,
    private citaService: CitaService
  ) { }

  ngOnInit() {
    this.getInformacionGeneral();
    this.getPartesRelacionadas(); 
    this.getCitasCompletadas(); 
  }

  getInformacionGeneral() {
    this.expedienteService.getInformacionGeneral(this.numeroExpediente).subscribe(
      (data) => {
        // Formatear la fecha antes de asignarla
        if (data.fechaApertura) {
          data.fechaApertura = this.formatearFecha(data.fechaApertura);
        }

        // Formatear el estado antes de asignarlo
        if (data.estado) {
          data.estado = this.formatearEstado(data.estado);
        }

        this.expediente = data;
        console.log('Datos del expediente cargados:', this.expediente);
      },
      (error) => {
        console.error('Error al cargar expediente:', error);
        this.expediente = null;
      }
    );
  }

  // Obtener las partes relacionadas del expediente
  getPartesRelacionadas() {
    this.expedienteService.getPartesPorExpediente(this.numeroExpediente).subscribe(
      (data) => {
        this.demandantes = data.filter((parte) => parte.tipoParte === 'Demandante');
        this.demandados = data.filter((parte) => parte.tipoParte === 'Demandado');
        this.terceros = data.filter((parte) => parte.tipoParte === 'Tercero Relacionado');
        console.log('Demandantes:', this.demandantes);
        console.log('Demandados:', this.demandados);
        console.log('Terceros Relacionados:', this.terceros);
      },
      (error) => {
        console.error('Error al cargar partes relacionadas:', error);
      }
    );
  }

  getCitasCompletadas(): void {
    this.citaService.getCitasCompletadasByExpediente(this.numeroExpediente).subscribe(
      (citas) => {
        this.citasCompletadas = citas.map((cita) => {
          const horaInicio = cita.horaInicio
            ? new Date(cita.horaInicio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })
            : '';
          const horaFinal = cita.horaFinal
            ? new Date(cita.horaFinal).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })
            : '';
          return {
            ...cita,
            horaInicio,
            horaFinal
          };
        });
        console.log('Citas completadas:', this.citasCompletadas);
      },
      (error) => {
        console.error('Error al obtener citas completadas:', error);
      }
    );
  }
  


  // Método para formatear la fecha
  formatearFecha(fecha: string): string {
    return fecha.split('T')[0]; // Extrae solo la parte de la fecha (YYYY-MM-DD)
  }

  // Método para formatear el estado
  formatearEstado(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'abierto':
        return 'Abierto';
      case 'proceso':
        return 'En Proceso';
      case 'cerrado':
        return 'Cerrado';
      default:
        return estado; // Por si acaso
    }
  }

  verNotas() {
    console.log("Ver notas clickeado");
    // Aquí agrega la lógica para mostrar las notas
  }
  
  nuevaNota() {
    console.log("Nueva nota clickeada");
    // Aquí agrega la lógica para crear una nueva nota
  }
  

}
