import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as bootstrap from 'bootstrap'; // Import Bootstrap correctly
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CitaService } from '../../services/cita.service';  // Importa el servicio
import { Cita } from '../../models/cita';

@Component({
  selector: 'app-gestion-cita',
  standalone: true,
  imports: [
    BarraLateralComponent,
    FullCalendarModule,
  ],
  templateUrl: './gestion-cita.component.html',
  styleUrls: ['./gestion-cita.component.css']
})
export class GestionCitaComponent /*implements OnInit*/ {
  /*calendarOptions: any;
  citas: Cita[] = []; // Almacena las citas
  selectedCita: Cita | null = null; // Variable para almacenar la cita seleccionada

  constructor(private citaService: CitaService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.loadCitas(); // Carga las citas al inicializar
    this.initializeCalendar();
  }

  initializeCalendar() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      events: this.formatEvents(),
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
    };
  }

  loadCitas() {
    this.citaService.getCitas().subscribe(
      (citas: Cita[]) => {
        this.citas = citas;
        this.calendarOptions.events = this.formatEvents();
      },
      (error) => {
        console.error('Error al cargar las citas:', error);
      }
    );
  }

  formatEvents() {
    return this.citas.map(cita => ({
      title: cita.motivo,
      date: cita.fechaAgenda,
      extendedProps: {
        estadoCita: cita.estadoCita,
        nombreCliente: cita.nombreCliente,
        telefonoCliente: cita.telefonoCliente,
        nombreServicio: cita.nombreServicio,
        descripcion: cita.descripcion,
        costo: cita.costo,
        idCita: cita.idCita, // Asegúrate de que esta propiedad esté incluida
        aPCliente: cita.aPCliente || '',
        aMCliente: cita.aMCliente || '',
        horaInicio: cita.horaInicio || '',
        horaFinal: cita.horaFinal || ''
      }
    }));
  }

  handleDateClick(arg: any) {
    alert('Fecha seleccionada: ' + arg.dateStr);
    // Aquí puedes abrir un formulario para agregar una nueva cita
  }

  handleEventClick(arg: any) {
    // Asegúrate de que todas las propiedades necesarias estén presentes
    this.selectedCita = {
      idCita: arg.event.extendedProps.idCita || 0,
      motivo: arg.event.title,
      estadoCita: arg.event.extendedProps.estadoCita || '',
      nombreCliente: arg.event.extendedProps.nombreCliente || '',
      telefonoCliente: arg.event.extendedProps.telefonoCliente || '',
      nombreServicio: arg.event.extendedProps.nombreServicio || '',
      descripcion: arg.event.extendedProps.descripcion || '',
      costo: arg.event.extendedProps.costo || 0,
      fechaAgenda: arg.event.start.toISOString(),
      aPCliente: arg.event.extendedProps.aPCliente || '',
      aMCliente: arg.event.extendedProps.aMCliente || '',
      horaInicio: arg.event.extendedProps.horaInicio || '',
      horaFinal: arg.event.extendedProps.horaFinal || ''
    };

    if (isPlatformBrowser(this.platformId)) {
      // Abre el modal
      const modalElement = document.getElementById('citaModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }*/
}
