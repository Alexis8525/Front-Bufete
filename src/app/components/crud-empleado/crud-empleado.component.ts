import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { Empleado } from '../../models/empleados';
import { EmpleadoService } from '../../services/empleado.service';
import { RolService } from '../../services/rol.service';
import { EspecialidadService } from '../../services/especialidad.service';
import { FormsModule } from '@angular/forms';
import { NuevoEmpleadoComponent } from '../modals/nuevo-empleado/nuevo-empleado.component';
import { EditarEmpleadoComponent } from '../modals/editar-empleado/editar-empleado.component';

@Component({
  selector: 'app-crud-empleado',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    FormsModule,
    NuevoEmpleadoComponent,
    EditarEmpleadoComponent,
  ],
  templateUrl: './crud-empleado.component.html',
  styleUrls: ['./crud-empleado.component.css']
})
export class CrudEmpleadoComponent implements OnInit {
  empleados: Empleado[] = [];
  empleadosFiltrados: Empleado[] = [];
  modalEditarVisible: boolean = false;
  modalNuevoVisible: boolean = false;
  empleadoSeleccionado: Empleado | null = null;

  // Variables de filtros
  filtroNombre: string = '';
  filtroCorreo: string = '';
  filtroTelefono: string = '';
  filtroRol: string = '';
  filtroEspecialidad: string = '';

  constructor(
    public empleadoService: EmpleadoService,
    public rolService: RolService,
    public especialidadService: EspecialidadService
  ) {}

  ngOnInit(): void {
    this.getEmpleados();
    this.getRoles();
    this.getEspecialidades();
  }

  getEmpleados() {
    this.empleadoService.getEmpleados().subscribe(
      res => {
        this.empleados = res;
        this.empleadosFiltrados = [...this.empleados];
      },
      err => console.log(err)
    );
  }

  getRoles() {
    this.rolService.getRoles().subscribe(
      res => {
        this.rolService.roles = res;
      },
      err => console.log(err)
    );
  }

  getEspecialidades() {
    this.especialidadService.getEspecialidades().subscribe(
      res => {
        this.especialidadService.especialidades = res;
      },
      err => console.log(err)
    );
  }

  filtrarEmpleados() {
    this.empleadosFiltrados = this.empleados.filter(empleado => {
      const coincideNombre = !this.filtroNombre || (`${empleado.nombreEmpleado} ${empleado.aPEmpleado} ${empleado.aMEmpleado}`.toLowerCase().includes(this.filtroNombre.toLowerCase()));
      const coincideCorreo = !this.filtroCorreo || empleado.correo.toLowerCase().includes(this.filtroCorreo.toLowerCase());
      const coincideTelefono = !this.filtroTelefono || empleado.telefono.toLowerCase().includes(this.filtroTelefono.toLowerCase());
      const coincideRol = !this.filtroRol || empleado.idRolFK?.toString() === this.filtroRol;
      const coincideEspecialidad = !this.filtroEspecialidad || empleado.idEspecialidadFK?.toString() === this.filtroEspecialidad;

      return coincideNombre && coincideCorreo && coincideTelefono && coincideRol && coincideEspecialidad;
    });
  }

  abrirModalNuevoEmpleado() {
    this.modalNuevoVisible = true;
  }

  cerrarModalNuevoEmpleado() {
    this.modalNuevoVisible = false;
  }

  abrirModalEditar(empleado: Empleado) {
    this.empleadoSeleccionado = empleado;
    this.modalEditarVisible = true;
  }

  cerrarModalEditar() {
    this.modalEditarVisible = false;
    this.empleadoSeleccionado = null;
  }

  crearEmpleado(nuevoEmpleado: Empleado) {
    this.empleadoService.crearEmpleado(nuevoEmpleado).subscribe(
      res => {
        this.getEmpleados();
        this.cerrarModalNuevoEmpleado();
      },
      err => console.error('Error al crear empleado:', err)
    );
  }

  onEmpleadoActualizado() {
    this.getEmpleados();
    this.cerrarModalEditar();
  }

  // Métodos para obtener el nombre del rol y la especialidad
  getRolNombre(idRol: number): string {
    const rol = this.rolService.roles.find(r => r.idRol === idRol);
    return rol ? rol.nombreRol : 'Sin Rol';
  }

  getEspecialidadNombre(idEspecialidad: number): string {
    const especialidad = this.especialidadService.especialidades.find(e => e.idEspecialidad === idEspecialidad);
    return especialidad ? especialidad.nombreEspecialidad : 'Sin Especialidad';
  }
}
