import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-barra-busqueda-home',
  standalone: true, // Marcar como standalone
  imports: [FormsModule, CommonModule], // Importar módulos necesarios
  templateUrl: './barra-busqueda-home.component.html',
  styleUrls: ['./barra-busqueda-home.component.css']
})
export class BarraBusquedaHomeComponent {
  terminoBusqueda: string = '';

  // Palabras clave y sus rutas asociadas para la página de inicio
  private palabrasClaveHome = [
    { termino: 'servicios', ruta: '/principal-servicios' },
    { termino: 'contacto', ruta: '/principal-contactos' },
    { termino: 'conócenos', ruta: '/principal-conocenos' },
    { termino: 'inicio', ruta: '/home' },
    { termino: 'historia', ruta: '/principal-conocenos#historia' }, // Nueva palabra clave
    { termino: 'valores', ruta: '/principal-conocenos#valores' }, // Nueva palabra clave
    { termino: 'misión', ruta: '/principal-conocenos#mision' }, // Nueva palabra clave
    { termino: 'visión', ruta: '/principal-conocenos#vision' }, // Nueva palabra clave
    { termino: 'oficinas', ruta: '/principal-contactos' }, // Nueva palabra clave
    { termino: 'teléfonos', ruta: '/principal-contactos' }, // Nueva palabra clave
    { termino: 'correo', ruta: '/principal-contactos' }, // Nueva palabra clave
    { termino: 'redes sociales', ruta: '/principal-contactos' }, // Nueva palabra clave
    { termino: 'mapa del sitio', ruta: '/mapa-sitio' }, // Nueva palabra clave
    { termino: 'Localización', ruta: '/principal-contactos' } // Nueva palabra clave
  ];

  // Palabras clave relacionadas con "principal" que deben redirigir a login
  private palabrasClavePrincipal = [
    'citas', 'empleados', 'clientes', 'horarios', 'expedientes'
  ];

  // Palabras clave específicas por rol
  private palabrasClaveRol = {
    secretaria: [
      { termino: 'empleados', ruta: '/empleado' },
      { termino: 'clientes', ruta: '/gestion-cliente' },
      { termino: 'horarios', ruta: '/gestion-horario' },
      { termino: 'calendario secretaria', ruta: '/calendario-secretaria' },
      { termino: 'crear expediente', ruta: '/upload-file' }
    ],
    abogado: [
      { termino: 'calendario abogado', ruta: '/calendario-abogado' },
      { termino: 'crear expediente', ruta: '/upload-file' },
      { termino: 'ver expedientes', ruta: '/visualizar' },
      { termino: 'papelera', ruta: '/historial-expedientes' }
    ],
    cliente: [
      { termino: 'nueva cita', ruta: '/cita' },
      { termino: 'citas programadas', ruta: '/calendario-cliente' }
    ]
  };

  constructor(private router: Router) {}

  buscarGlobal(): void {
    const termino = this.terminoBusqueda.toLowerCase().trim();

    // Buscar coincidencias en las palabras clave de "home"
    const coincidenciaHome = this.palabrasClaveHome.find(palabra =>
      palabra.termino.includes(termino) || termino.includes(palabra.termino)
    );

    // Buscar coincidencias en las palabras clave de "principal"
    const esBusquedaPrincipal = this.palabrasClavePrincipal.some(palabra =>
      termino.includes(palabra)
    );

    // Obtener el rol del usuario (puedes obtenerlo del localStorage)
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const rol = usuario.rol;

    // Buscar coincidencias en las palabras clave específicas por rol
    let coincidenciaRol;
    if (rol === 1) { // Secretaria
      coincidenciaRol = this.palabrasClaveRol.secretaria.find(palabra =>
        palabra.termino.includes(termino) || termino.includes(palabra.termino)
      );
    } else if (rol === 2) { // Abogado
      coincidenciaRol = this.palabrasClaveRol.abogado.find(palabra =>
        palabra.termino.includes(termino) || termino.includes(palabra.termino)
      );
    } else if (rol === 3) { // Cliente
      coincidenciaRol = this.palabrasClaveRol.cliente.find(palabra =>
        palabra.termino.includes(termino) || termino.includes(palabra.termino)
      );
    }

    if (coincidenciaHome) {
      // Redirigir a la ruta correspondiente en "home"
      this.router.navigate([coincidenciaHome.ruta]);
    } else if (coincidenciaRol) {
      // Redirigir a la ruta correspondiente según el rol
      this.router.navigate([coincidenciaRol.ruta]);
    } else if (esBusquedaPrincipal) {
      // Redirigir a la página de login si la búsqueda está relacionada con "principal"
      this.router.navigate(['/login']);
    } else {
      // Si no hay coincidencia, redirigir a una página de resultados de búsqueda
      this.router.navigate(['/buscar'], { queryParams: { q: termino } });
    }
  }
}
