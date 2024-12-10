import { Component, OnInit } from '@angular/core';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Expediente } from '../../models/expediente';
import { ExpedienteService } from '../../services/expediente.service';
import { CitaService } from '../../services/cita.service';
import { NotaService } from '../../services/nota.service';
import { Nota } from '../../models/notas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VerNotasModalComponent } from '../modals/ver-notas/ver-notas.component';
import { CrearNotaModalComponent } from '../modals/nueva-nota/nueva-nota.component';
import { CommandManager } from '../../patterns/command/command-manager';
import { ValidateNoteCommand } from '../../patterns/command/validate-note-command';
import { CreateNoteCommand } from '../../patterns/command/create-note-command';
import { SendEmailCommand } from '../../patterns/command/send-email-command';

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
    private citaService: CitaService,
    private modalService: NgbModal,
    private notaService: NotaService
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

  modalVerNotaVisible: boolean = false;
  modalNuevaNotaVisible: boolean = false;
  notaSeleccionada: any = null; // Cambia el tipo según tu modelo de Nota

  abrirModalVerNotas(idCita: number): void {
    this.notaService.getNotasByCita(idCita).subscribe(
      (notas) => {
        console.log('Notas obtenidas para la cita:', notas);
        if (notas.length > 0) {
          const modalRef = this.modalService.open(VerNotasModalComponent);
          modalRef.componentInstance.notas = notas; // Pasar la lista completa de notas
        } else {
          console.warn('No hay notas asociadas a esta cita');
        }
      },
      (error) => console.error('Error al cargar las notas:', error)
    );
  }
  
  cerrarModalVerNota() {
    this.notaSeleccionada = null;
    this.modalVerNotaVisible = false;
  }

  abrirModalNuevaNota(idExpediente: number, idCita: number): void {
    if (!idExpediente || !idCita) {
      console.error('Faltan parámetros obligatorios: idExpediente o idCita');
      return;
    }
  
    const modalRef = this.modalService.open(CrearNotaModalComponent);
    modalRef.componentInstance.idExpedienteFK = idExpediente;
    modalRef.componentInstance.idCitaFK = idCita;
  
    modalRef.componentInstance.notaCreada.subscribe((nuevaNota: Nota) => {
      const commandManager = new CommandManager();
  
      // Registrar comandos
      commandManager.registerCommand(new ValidateNoteCommand(idExpediente, idCita, nuevaNota));
      commandManager.registerCommand(new CreateNoteCommand(this.notaService, nuevaNota));
      commandManager.registerCommand(new SendEmailCommand(this.notaService, nuevaNota, nuevaNota.tipoNota));
  
      // Ejecutar comandos
      commandManager.executeCommands();
  
      // Opcional: actualizar la vista
      this.getCitasCompletadas();
    });
  }
  
  
  
  
  crearNota(nota: Nota): void {
    this.notaService.crearNota(nota).subscribe({
      next: (response) => {
        console.log('Nota creada exitosamente:', response);
      },
      error: (err) => {
        console.error('Error al crear la nota:', err);
      },
    });
  }

  
   
  
  
  guardarNota(nuevaNota: Nota): void {
    this.notaService.crearNota(nuevaNota).subscribe(
      (respuesta) => {
        console.log('Nota guardada exitosamente:', respuesta);
        // Refresca la lista de notas si es necesario
        this.abrirModalVerNotas(nuevaNota.idCitaFK!); // Refresca las notas de la cita
      },
      (error) => console.error('Error al guardar la nota:', error)
    );
  }
  
  
}