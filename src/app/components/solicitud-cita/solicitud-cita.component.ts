import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { EspecialidadCita } from '../../models/especialidad-cita';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../services/servicio.service';
import { Cita } from '../../models/cita';

@Component({
  selector: 'app-solicitud-cita',
  templateUrl: './solicitud-cita.component.html',
  styleUrls: ['./solicitud-cita.component.css'],
  standalone: true,
  imports: [
    BarraLateralComponent,
    FormsModule,
    CommonModule,
  ]
})
export class SolicitudCitaComponent implements OnInit {
  especialidades: EspecialidadCita[] = [];
  selectedServicio: string = '';
  selectedHora: string = '';
  abogados: EspecialidadCita[] = [];
  cliente: Cliente | null = null;
  idAbogadoSeleccionado: number | null = null;
  servicioSeleccionado: number | null = null; // Para almacenar el idServicio seleccionado
  horasDisponibles: { idAgenda: number; rango: string }[] = [];
  horaSeleccionada: string | null = null;
  fechasDisponibles: string[] = [];
  fechaSeleccionada: string | null = null;
  motivoCita: string = '';
  horarioSeleccionadoId: number | null = null; 

  constructor(
    public citaService: CitaService,
    public clienteService: ClienteService,
    public servicioService: ServicioService,
  ) {}

  ngOnInit() {
    const userId = this.getUserId();
    this.getClienteById(userId);
    this.getServicios();
  }

  getUserId(): number | null {
    if (typeof window !== 'undefined') {
      const usuarioId = localStorage.getItem('usuarioId');
      return usuarioId ? parseInt(usuarioId, 10) : null;
    }
    return null;
  }

  getClienteById(idCliente: number | null) {
    if (idCliente) {
      this.clienteService.getClienteById(idCliente).subscribe(
        res => {
          this.cliente = res;
          this.fillClientData();
        },
        err => console.log('Error al recuperar el cliente:', err)
      );
    }
  }

  fillClientData() {
    if (this.cliente) {
      const nombreInput = document.getElementById('nombre') as HTMLInputElement;
      const correoInput = document.getElementById('correo') as HTMLInputElement;
      const telefonoInput = document.getElementById('telefono') as HTMLInputElement;

      nombreInput.value = `${this.cliente.nombreCliente} ${this.cliente.aPCliente} ${this.cliente.aMCliente}`;
      correoInput.value = this.cliente.correo;
      telefonoInput.value = this.cliente.telefono;
    }
  }

  getServicios() {
    this.servicioService.getServicios().subscribe(
      res => {
        this.servicioService.servicios = res;
      },
      err => console.log(err)
    );
  }

  onServicioSeleccionado(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const servicioId = Number(selectElement.value);
    this.servicioSeleccionado = servicioId; 
    this.cargarAbogadosPorServicio(servicioId);
  }

  cargarAbogadosPorServicio(servicioId: number) {
    this.citaService.getAbogadosPorServicio(servicioId).subscribe((data: EspecialidadCita[]) => {
      this.especialidades = data;
      this.idAbogadoSeleccionado = null;
      this.fechasDisponibles = []; // Limpiar fechas al cambiar el servicio
      this.horasDisponibles = []; // Limpiar horas al cambiar el servicio
    }, error => {
      console.error('Error al cargar abogados:', error);
    });
  }

  onAbogadoSeleccionado(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.idAbogadoSeleccionado = Number(selectElement.value);
    this.cargarFechasDisponiblesPorAbogado();
  }

  cargarFechasDisponiblesPorAbogado() {
    if (this.idAbogadoSeleccionado) {
      this.citaService.getHorariosDisponiblesPorAbogado(this.idAbogadoSeleccionado).subscribe(data => {
        console.log('Datos de horarios disponibles por abogado:', data); // Verifica los datos completos que recibes
  
        // Extraer fechas únicas y asegurarse de que estén bien formateadas
        const fechas = data.map(horario => {
          const fecha = new Date(horario.fecha);
          // Usamos toISOString() para asegurarnos de que la fecha se obtenga en formato YYYY-MM-DD
          return fecha.toISOString().split('T')[0]; // Esto devuelve solo la parte de la fecha (YYYY-MM-DD)
        });
  
        // Filtrar fechas duplicadas usando Set
        this.fechasDisponibles = [...new Set(fechas)];
  
        console.log('Fechas disponibles:', this.fechasDisponibles); // Imprime las fechas disponibles para verificar
  
        this.fechaSeleccionada = null;
        this.horasDisponibles = [];
      });
    }
  }
  

  onFechaSeleccionada(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.fechaSeleccionada = selectElement.value;
  
    // Verificar si la fecha seleccionada es válida
    if (this.fechaSeleccionada) {
      this.cargarHorariosDisponiblesPorFecha();
    }
  }
  
  cargarHorariosDisponiblesPorFecha() {
    if (this.idAbogadoSeleccionado && this.fechaSeleccionada) {
      this.citaService.getHorariosDisponiblesPorAbogado(this.idAbogadoSeleccionado).subscribe(data => {
        const horariosFiltrados = data.filter(horario => {
          const fechaHora = new Date(horario.fecha);
          return fechaHora.toISOString().split('T')[0] === this.fechaSeleccionada;
        });
  
        // Mapear el `idAgenda` junto con el rango de horas y almacenar en `horasDisponibles`
        this.horasDisponibles = horariosFiltrados.map(horario => {
          const horaInicio = new Date(horario.horaInicio);
          const horaFin = new Date(horario.horaFinal);
          
          const horaInicioFormateada = this.formatTime(horaInicio.getUTCHours(), horaInicio.getUTCMinutes());
          const horaFinFormateada = this.formatTime(horaFin.getUTCHours(), horaFin.getUTCMinutes());
  
          return {
            idAgenda: horario.idAgenda,
            rango: `${horaInicioFormateada} - ${horaFinFormateada}`
          };
        });
  
        console.log('Horas disponibles para la fecha seleccionada:', this.horasDisponibles);
      }, error => {
        console.error('Error al cargar los horarios:', error);
      });
    }
  }
  
  onHoraSeleccionada(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedHora = selectElement.value;
  
    // Encuentra el horario con el rango seleccionado y extrae su `idAgenda`
    const horarioSeleccionado = this.horasDisponibles.find(h => h.rango === selectedHora);
    if (horarioSeleccionado) {
      this.horarioSeleccionadoId = horarioSeleccionado.idAgenda;
    }
  
    this.horaSeleccionada = selectedHora;
  }
  
  
  // Método para formatear las horas en formato 'HH:mm AM/PM'
  formatTime(hours: number, minutes: number): string {
    // Determinar si es AM o PM
    const period = hours >= 12 ? 'PM' : 'AM';

    let formattedHours = hours % 12;
    if (formattedHours === 0) {
      formattedHours = 12; //
    }

    const formattedMinutes = this.padZero(minutes);

    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  
  // Método para agregar un cero a la izquierda en caso de que las horas o minutos sean menores a 10
  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
  
  // Método para crear la cita
  solicitarCita() {
    if (!this.motivoCita || !this.servicioSeleccionado || !this.idAbogadoSeleccionado || !this.fechaSeleccionada || !this.horaSeleccionada) {
      alert('Por favor, complete todos los campos.');
      return;
    }
  
    const citaData: Cita = {
      motivo: this.motivoCita,
      estado: 'programada',
      idClienteFK: this.cliente ? this.cliente.idCliente : 0,
      idServicioFK: this.servicioSeleccionado, // Agregar idServicioFK a citaData
      idAgendaFK: this.horarioSeleccionadoId ?? 0,
      idAbogado: this.idAbogadoSeleccionado,
      fechaAgenda: this.fechaSeleccionada,
      horaInicio: this.horaSeleccionada.split(' - ')[0],
      horaFinal: this.horaSeleccionada.split(' - ')[1],
    };
  
    console.log('Datos de la cita a crear:', citaData);
  
    this.citaService.crearCitaConTransaccion(citaData).subscribe({
      next: (response) => {
        console.log('Cita creada con éxito', response);
        
        // Limpiar el formulario
        this.motivoCita = '';
        this.servicioSeleccionado = null;
        this.idAbogadoSeleccionado = null;
        this.fechaSeleccionada = null;
        this.horaSeleccionada = null;
        this.horarioSeleccionadoId = null;
  
        // Limpiar las opciones dependientes
        this.especialidades = [];
        this.fechasDisponibles = [];
        this.horasDisponibles = [];
  
        alert('La cita se ha guardado correctamente.');
      },
      error: (err) => {
        console.error('Error al crear la cita:', err);
      }
    });
  }  
  
}
