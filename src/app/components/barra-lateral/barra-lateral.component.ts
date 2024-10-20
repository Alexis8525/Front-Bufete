import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.css']
})
export class BarraLateralComponent {
  // Método para manejar el clic del botón
  toggleSidebar(): void {
    const sidebar = document.querySelector("#sidebar") as HTMLElement | null;
    sidebar?.classList.toggle("expand");
  }
  // Configuración del calendario
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', // Vista inicial
    plugins: [dayGridPlugin, timeGridPlugin],
    events: [
      { title: 'Cita 1', date: '2024-10-25' }, // Ejemplo de cita
      { title: 'Cita 2', date: '2024-10-26' }
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    }
  };
}
