import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { EspecialidadCita } from '../../models/especialidad-cita';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../services/servicio.service';

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
  horasDisponibles: string[] = [];
  cliente: Cliente | null = null;
  idAbogadoSeleccionado: number | null = null; 
  servicioSeleccionado: number | null = null;
  selectedAbogado: EspecialidadCita | null = null;

  diasDelMes: number[] = [];
  mesActual: number;
  anioActual: number;
  nombreMesActual: string;
  nombresDias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  selectedFecha: Date | null = null;
  


  constructor(
    public citaService: CitaService,
    public clienteService: ClienteService,
    public servicioService: ServicioService,
  ) { 
    const fecha = new Date();
    this.mesActual = fecha.getMonth();
    this.anioActual = fecha.getFullYear();
    this.nombreMesActual = this.obtenerNombreMes();
  }

  ngOnInit() {
    const userId = this.getUserId();
    this.getClienteById(userId);
    this.getServicios();
  }

  // Método para obtener el ID del usuario almacenado en localStorage
  getUserId(): number | null {
    if (typeof window !== 'undefined') {
      const usuarioId = localStorage.getItem('usuarioId');
      console.log('Valor de usuarioId en localStorage:', usuarioId);
      return usuarioId ? parseInt(usuarioId, 10) : null;
    }
    return null;
  }

  // Método para obtener los datos del cliente a partir del ID
  getClienteById(idCliente: number | null) {
    if (idCliente) {
      this.clienteService.getClienteById(idCliente).subscribe(
        res => {
          this.cliente = res;
          console.log('Cliente recuperado:', this.cliente);
          this.fillClientData();
        },
        err => console.log('Error al recuperar el cliente:', err)
      );
    } else {
      console.log('No se proporcionó un ID de cliente válido.');
    }
  }

  // Llenar los campos del formulario a partir de la información recuperada
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

  // Método para obtener los servicios
  getServicios() {
    this.servicioService.getServicios().subscribe(
      res => {
        this.servicioService.servicios = res;
      },
      err => console.log(err)
    )
  }

  onServicioSeleccionado(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const servicioId = Number(selectElement.value);
    this.servicioSeleccionado = servicioId;
    console.log('ID del servicio seleccionado:', this.servicioSeleccionado);

    // Aquí puedes añadir lógica adicional, por ejemplo, cargar abogados
    this.cargarAbogadosPorServicio(servicioId);
  }

  // Método para filtrar los abogados en base al ID del servicio seleccionado
  cargarAbogadosPorServicio(servicioId: number) {
    this.citaService.getAbogadosPorServicio(servicioId).subscribe((data: EspecialidadCita[]) => {
      console.log('Abogados cargados:', data);
      this.especialidades = data;
      // No seleccionamos automáticamente ningún abogado
      this.idAbogadoSeleccionado = null; 
    }, error => {
      console.error('Error al cargar abogados:', error);
    });
  }


  // Calendario
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

  generarDiasDelMes(): void {
    const primerDia = new Date(this.anioActual, this.mesActual, 1).getDay();
    const diasEnElMes = new Date(this.anioActual, this.mesActual + 1, 0).getDate();
    const inicioCalendario = (primerDia === 0) ? 6 : primerDia - 1;

    this.diasDelMes = Array.from({ length: 42 }, (_, i) => {
      if (i < inicioCalendario || i >= inicioCalendario + diasEnElMes) {
        return 0;
      }
      return i - inicioCalendario + 1;
    });
  }

  // Método para formatear las horas
  formatHour(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
