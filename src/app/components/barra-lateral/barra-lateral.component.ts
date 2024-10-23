import { Component, ElementRef, Renderer2, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions } from '@fullcalendar/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.css']
})
export class BarraLateralComponent {
  @ViewChild('sidebar') sidebarRef!: ElementRef;  // Referencia a la barra lateral
  private isBrowser: boolean;  // Verifica si estamos en el navegador
  public isExpanded: boolean = false;  // Estado para saber si el sidebar está expandido

  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);  // Verifica si estamos en el navegador
  }

  toggleSidebar(): void {
    // Solo ejecutar este código si estamos en el navegador
    if (this.isBrowser) {
      const sidebar = this.sidebarRef.nativeElement; // Usar ElementRef para acceder al elemento
      if (this.isExpanded) {
        this.renderer.removeClass(sidebar, 'expand'); // Remover clase 'expand'
      } else {
        this.renderer.addClass(sidebar, 'expand'); // Agregar clase 'expand'
      }
      this.isExpanded = !this.isExpanded; // Alternar el estado
    }
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',  // Vista inicial del calendario
    plugins: [dayGridPlugin, timeGridPlugin],  // Plugins de FullCalendar
    events: [
      { title: 'Cita 1', date: '2024-10-25' },
      { title: 'Cita 2', date: '2024-10-26' }
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    }
  };
}
