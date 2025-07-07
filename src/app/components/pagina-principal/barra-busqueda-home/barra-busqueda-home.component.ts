import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-barra-busqueda-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './barra-busqueda-home.component.html',
  styleUrls: ['./barra-busqueda-home.component.css']
})
export class BarraBusquedaHomeComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  terminoBusqueda: string = '';
  sugerencias: any[] = [];
  mostrarSugerencias: boolean = false;
  sugerenciaSeleccionada: number = -1;
  isBrowser: boolean;

  private palabrasClaveHome = [
    { termino: 'servicios', ruta: '/principal-servicios', categoria: 'Inicio' },
    { termino: 'contacto', ruta: '/principal-contactos', categoria: 'Inicio' },
    { termino: 'conócenos', ruta: '/principal-conocenos', categoria: 'Inicio' },
    { termino: 'inicio', ruta: '/home', categoria: 'Inicio' },
    { termino: 'historia', ruta: '/principal-conocenos', categoria: 'Nosotros' },
    { termino: 'valores', ruta: '/principal-conocenos', categoria: 'Nosotros' },
    { termino: 'misión', ruta: '/principal-conocenos', categoria: 'Nosotros' },
    { termino: 'visión', ruta: '/principal-conocenos', categoria: 'Nosotros' },
    { termino: 'oficinas', ruta: '/principal-contactos', categoria: 'Contacto' },
    { termino: 'teléfonos', ruta: '/principal-contactos', categoria: 'Contacto' },
    { termino: 'correo', ruta: '/principal-contactos', categoria: 'Contacto' },
    { termino: 'redes sociales', ruta: '/principal-contactos', categoria: 'Contacto' },
    { termino: 'mapa del sitio', ruta: '/mapa-sitio', categoria: 'Navegación' },
    { termino: 'localización', ruta: '/principal-contactos', categoria: 'Contacto' },
    { termino: 'registro', ruta: '/register', categoria: 'Registro' },
    { termino: 'login', ruta: '/login', categoria: 'Logearse' }

  ];

  private palabrasClavePrincipal = [
    { termino: 'citas', ruta: '/login', categoria: 'Acceso requerido' },
    { termino: 'empleados', ruta: '/login', categoria: 'Acceso requerido' },
    { termino: 'clientes', ruta: '/login', categoria: 'Acceso requerido' },
    { termino: 'horarios', ruta: '/login', categoria: 'Acceso requerido' },
    { termino: 'expedientes', ruta: '/login', categoria: 'Acceso requerido' },
    
  ];

  private palabrasClaveRol: { [key: string]: { termino: string; ruta: string; categoria: string }[] } = {
    secretaria: [
      { termino: 'empleados', ruta: '/empleado', categoria: 'Secretaría' },
      { termino: 'clientes', ruta: '/gestion-cliente', categoria: 'Secretaría' },
      { termino: 'horarios', ruta: '/gestion-horario', categoria: 'Secretaría' },
      { termino: 'calendario secretaria', ruta: '/calendario-secretaria', categoria: 'Secretaría' },
      { termino: 'crear expediente', ruta: '/crear-expediente', categoria: 'Secretaría' }
    ],
    abogado: [
      { termino: 'calendario abogado', ruta: '/calendario-abogado', categoria: 'Abogado' },
      { termino: 'crear expediente', ruta: '/crear-expediente', categoria: 'Abogado' },
      { termino: 'ver expedientes', ruta: '/visualizar-expediente', categoria: 'Abogado' },
      { termino: 'papelera', ruta: '/historial-expedientes', categoria: 'Abogado' }
    ],
    cliente: [
      { termino: 'nueva cita', ruta: '/cita', categoria: 'Cliente' },
      { termino: 'citas programadas', ruta: '/calendario-cliente', categoria: 'Cliente' }
    ]
  };

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  buscarSugerencias(): void {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    this.sugerencias = [];
    this.sugerenciaSeleccionada = -1;

    if (termino.length < 2) {
      this.mostrarSugerencias = false;
      return;
    }

    const usuario = this.isBrowser ? JSON.parse(localStorage.getItem('usuario') || '{}') : {};
    const rol = usuario.rol;
    const autenticado = !!usuario.id;

    // Buscar coincidencias en home
    this.palabrasClaveHome.forEach(palabra => {
      if (this.coincideTermino(palabra.termino, termino)) {
        this.sugerencias.push({...palabra, tipo: 'home'});
      }
    });

    // Buscar coincidencias en palabras clave de principal
    this.palabrasClavePrincipal.forEach(palabra => {
      if (this.coincideTermino(palabra.termino, termino)) {
        const sugerencia = {...palabra};
        if (!autenticado) {
          sugerencia.termino = `${palabra.termino} (Inicia sesión)`;
          sugerencia.ruta = '/login';
          sugerencia.categoria = 'Acceso requerido';
        }
        this.sugerencias.push({...sugerencia, tipo: 'principal'});
      }
    });

    // Buscar coincidencias por rol
    if (autenticado && rol) {
      const rolNombre = this.obtenerNombreRol(rol);
      const palabrasRol = rolNombre ? this.palabrasClaveRol[rolNombre] || [] : [];
      
      palabrasRol.forEach((palabra: { termino: string; ruta: string; categoria: string }) => {
        if (this.coincideTermino(palabra.termino, termino)) {
          this.sugerencias.push({...palabra, tipo: 'rol'});
        }
      });
    }

    this.mostrarSugerencias = this.sugerencias.length > 0;
  }

  private coincideTermino(palabra: string, termino: string): boolean {
    return palabra.includes(termino) || termino.includes(palabra);
  }

  private obtenerNombreRol(rolId: number): string | null {
    switch(rolId) {
      case 1: return 'secretaria';
      case 2: return 'abogado';
      case 3: return 'cliente';
      default: return null;
    }
  }

  seleccionarSugerencia(sugerencia: any): void {
    this.terminoBusqueda = '';
    this.mostrarSugerencias = false;
    this.router.navigate([sugerencia.ruta]);
  }

  buscarGlobal(event: Event): void {
    event.preventDefault();
    
    if (this.sugerenciaSeleccionada >= 0 && this.sugerencias[this.sugerenciaSeleccionada]) {
      this.seleccionarSugerencia(this.sugerencias[this.sugerenciaSeleccionada]);
      return;
    }

    const termino = this.terminoBusqueda.toLowerCase().trim();
    
    if (termino.length === 0) return;

    this.buscarSugerencias();
    
    if (this.sugerencias.length > 0) {
      this.seleccionarSugerencia(this.sugerencias[0]);
    } else {
      this.router.navigate(['/buscar'], { queryParams: { q: termino } });
    }
  }

  manejarTeclado(event: KeyboardEvent): void {
    if (!this.mostrarSugerencias) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.sugerenciaSeleccionada = Math.min(this.sugerenciaSeleccionada + 1, this.sugerencias.length - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.sugerenciaSeleccionada = Math.max(this.sugerenciaSeleccionada - 1, -1);
    } else if (event.key === 'Enter' && this.sugerenciaSeleccionada >= 0) {
      event.preventDefault();
      this.seleccionarSugerencia(this.sugerencias[this.sugerenciaSeleccionada]);
    } else if (event.key === 'Escape') {
      this.mostrarSugerencias = false;
    }
  }

  cerrarSugerencias(): void {
    setTimeout(() => {
      this.mostrarSugerencias = false;
    }, 200);
  }
}
