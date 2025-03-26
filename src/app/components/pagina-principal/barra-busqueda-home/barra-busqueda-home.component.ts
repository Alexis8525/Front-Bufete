import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  private palabrasClaveHome = [
    { termino: 'servicios', ruta: '/principal-servicios', categoria: 'Inicio' },
    { termino: 'contacto', ruta: '/principal-contactos', categoria: 'Inicio' },
    { termino: 'conócenos', ruta: '/principal-conocenos', categoria: 'Inicio' },
    { termino: 'inicio', ruta: '/home', categoria: 'Inicio' },
    { termino: 'historia', ruta: '/principal-conocenos#historia', categoria: 'Nosotros' },
    { termino: 'valores', ruta: '/principal-conocenos#valores', categoria: 'Nosotros' },
    { termino: 'misión', ruta: '/principal-conocenos#mision', categoria: 'Nosotros' },
    { termino: 'visión', ruta: '/principal-conocenos#vision', categoria: 'Nosotros' },
    { termino: 'oficinas', ruta: '/principal-contactos', categoria: 'Contacto' },
    { termino: 'teléfonos', ruta: '/principal-contactos', categoria: 'Contacto' },
    { termino: 'correo', ruta: '/principal-contactos', categoria: 'Contacto' },
    { termino: 'redes sociales', ruta: '/principal-contactos', categoria: 'Contacto' },
    { termino: 'mapa del sitio', ruta: '/mapa-sitio', categoria: 'Navegación' },
    { termino: 'localización', ruta: '/principal-contactos', categoria: 'Contacto' }
  ];

  private palabrasClavePrincipal = [
    'citas', 'empleados', 'clientes', 'horarios', 'expedientes'
  ];

  private palabrasClaveRol = {
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

  constructor(private router: Router) {}

  buscarSugerencias(): void {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    this.sugerencias = [];
    this.sugerenciaSeleccionada = -1;

    if (termino.length < 2) {
      this.mostrarSugerencias = false;
      return;
    }

    // Obtener el rol del usuario si está logueado
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const rol = usuario.rol;

    // Buscar coincidencias en home
    this.palabrasClaveHome.forEach(palabra => {
      if (palabra.termino.includes(termino) || termino.includes(palabra.termino)) {
        this.sugerencias.push({...palabra, tipo: 'home'});
      }
    });

    // Buscar coincidencias por rol
    if (rol === 1) { // Secretaria
      this.palabrasClaveRol.secretaria.forEach(palabra => {
        if (palabra.termino.includes(termino) || termino.includes(palabra.termino)) {
          this.sugerencias.push({...palabra, tipo: 'rol'});
        }
      });
    } else if (rol === 2) { // Abogado
      this.palabrasClaveRol.abogado.forEach(palabra => {
        if (palabra.termino.includes(termino) || termino.includes(palabra.termino)) {
          this.sugerencias.push({...palabra, tipo: 'rol'});
        }
      });
    } else if (rol === 3) { // Cliente
      this.palabrasClaveRol.cliente.forEach(palabra => {
        if (palabra.termino.includes(termino) || termino.includes(palabra.termino)) {
          this.sugerencias.push({...palabra, tipo: 'rol'});
        }
      });
    }

    // Buscar coincidencias en palabras clave de principal (solo muestra sugerencia de login)
    const esBusquedaPrincipal = this.palabrasClavePrincipal.some(palabra =>
      termino.includes(palabra)
    );

    if (esBusquedaPrincipal && this.sugerencias.length === 0) {
      this.sugerencias.push({
        termino: 'Iniciar sesión para acceder',
        ruta: '/login',
        categoria: 'Acceso requerido',
        tipo: 'login'
      });
    }

    this.mostrarSugerencias = this.sugerencias.length > 0;
  }

  seleccionarSugerencia(sugerencia: any, index: number): void {
    this.terminoBusqueda = sugerencia.termino;
    this.router.navigate([sugerencia.ruta]);
    this.mostrarSugerencias = false;
  }

  buscarGlobal(): void {
    if (this.sugerenciaSeleccionada >= 0 && this.sugerencias[this.sugerenciaSeleccionada]) {
      this.seleccionarSugerencia(this.sugerencias[this.sugerenciaSeleccionada], this.sugerenciaSeleccionada);
      return;
    }

    const termino = this.terminoBusqueda.toLowerCase().trim();
    
    if (termino.length === 0) return;

    // Lógica de búsqueda global existente...
    this.buscarSugerencias();
    
    if (this.sugerencias.length > 0) {
      this.seleccionarSugerencia(this.sugerencias[0], 0);
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
      this.seleccionarSugerencia(this.sugerencias[this.sugerenciaSeleccionada], this.sugerenciaSeleccionada);
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
