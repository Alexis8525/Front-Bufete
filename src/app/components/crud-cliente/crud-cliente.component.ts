import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule } from '@angular/forms';
import { NuevoClienteComponent } from '../modals/nuevo-cliente/nuevo-cliente.component';
import { EditarClienteComponent } from '../modals/editar-cliente/editar-cliente.component';
import { BreadcrumbsComponent } from "../breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-crud-cliente',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    FormsModule,
    NuevoClienteComponent,
    EditarClienteComponent,
    BreadcrumbsComponent
  ],
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.css']
})
export class CrudClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  clientesPaginados: Cliente[] = [];
  modalEditarVisible: boolean = false;
  modalNuevoVisible: boolean = false;
  clienteSeleccionado: Cliente | null = null;

  // Variables para filtros
  filtroNombre: string = '';
  filtroCorreo: string = '';
  filtroTelefono: string = '';

  // Variables de paginación
  paginaActual: number = 1;
  clientesPorPagina: number = 8; // Puedes cambiar esto para mostrar más o menos clientes por página
  totalPaginas: number = 0;

  constructor(
    public clienteService: ClienteService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getClientes();
  }

  // Obtener la lista de clientes
  getClientes() {
    this.clienteService.getClientes().subscribe(
      res => {
        this.clientes = res;
        this.clientesFiltrados = [...this.clientes];
        this.calcularPaginas();
      },
      err => console.error('Error al obtener clientes:', err)
    );
  }

  // Filtrar clientes en base a los filtros ingresados
  filtrarClientes() {
    this.clientesFiltrados = this.clientes.filter(cliente => {
      const coincideNombre = !this.filtroNombre || (`${cliente.nombreCliente} ${cliente.aPCliente} ${cliente.aMCliente}`.toLowerCase().includes(this.filtroNombre.toLowerCase()));
      const coincideCorreo = !this.filtroCorreo || (cliente.correo.toLowerCase().includes(this.filtroCorreo.toLowerCase()));
      const coincideTelefono = !this.filtroTelefono || (cliente.telefono.toLowerCase().includes(this.filtroTelefono.toLowerCase()));
      return coincideNombre && coincideCorreo && coincideTelefono;
    });
    this.calcularPaginas(); // Recalcular páginas al aplicar filtro
  }

  // Calcular el total de páginas
  calcularPaginas() {
    this.totalPaginas = Math.ceil(this.clientesFiltrados.length / this.clientesPorPagina);
    this.actualizarClientesPorPagina();
  }

  // Actualizar los clientes visibles según la página actual
  actualizarClientesPorPagina() {
    const inicio = (this.paginaActual - 1) * this.clientesPorPagina;
    const fin = this.paginaActual * this.clientesPorPagina;
    this.clientesPaginados = this.clientesFiltrados.slice(inicio, fin);
  }

  // Cambiar a la página anterior
  cambiarPaginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarClientesPorPagina();
    }
  }

  // Cambiar a la página siguiente
  cambiarPaginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarClientesPorPagina();
    }
  }

  // Cambiar a una página específica
  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.actualizarClientesPorPagina();
    }
  }

  // Abrir modal para crear nuevo cliente
  abrirModalNuevoCliente() {
    this.modalNuevoVisible = true;
  }

  // Cerrar modal de nuevo cliente
  cerrarModalNuevoCliente() {
    this.modalNuevoVisible = false;
  }

  // Abrir modal para editar cliente
  abrirModalEditar(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalEditarVisible = true;
  }

  // Cerrar modal de editar cliente
  cerrarModalEditar() {
    this.modalEditarVisible = false;
    this.clienteSeleccionado = null;
  }

  // Crear un nuevo cliente
  crearCliente(nuevoCliente: Cliente) {
    this.clienteService.crearCliente(nuevoCliente).subscribe(
      res => {
        this.getClientes();
        this.cerrarModalNuevoCliente();
      },
      err => console.error('Error al crear cliente:', err)
    );
  }

  // Manejar la actualización de un cliente
  onClienteActualizado() {
    this.getClientes();
    this.cerrarModalEditar();
  }
}
