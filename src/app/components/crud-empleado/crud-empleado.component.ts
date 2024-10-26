import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { Empleado } from '../../models/empleados';
import { EmpleadoService } from '../../services/empleado.service';
import { ModalService } from '../../services/modal.service';
import { EditarEmpleadoDialogoComponent } from '../editar-empleado-dialogo/editar-empleado-dialogo.component';
import { NuevoEmpleadoDialogoComponent } from '../nuevo-empleado-dialogo/nuevo-empleado-dialogo.component';

@Component({
  selector: 'app-crud-empleado',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    EditarEmpleadoDialogoComponent,
    NuevoEmpleadoDialogoComponent,
  ],
  templateUrl: './crud-empleado.component.html',
  styleUrl: './crud-empleado.component.css'
})

export class CrudEmpleadoComponent implements OnInit {

  empleados: Empleado[] = []; // Declarar la propiedad empleados

  constructor( 
    public empleadoService:EmpleadoService,
    private modalService: ModalService,
  ) {}

  ngOnInit() {
    this.getEmpleadoAbogado();
  }

  getEmpleadoAbogado(){
    this.empleadoService.getEmpleadoAbogado().subscribe(
      res => {
        this.empleados = res; 
      },
      err => console.log(err)
    )
  }

  openEditModal(empleado: Empleado): void {
    this.modalService.openModal(EditarEmpleadoDialogoComponent, empleado);
    console.log(this.modalService)
  }

  

  openNuevo(): void {
    const nuevoEmpleado: Empleado = {
      idEmpleado: 0,
      nombreEmpleado: '',
      aPEmpleado: '',
      aMEmpleado: '',
      fechaIngreso: new Date().toISOString().split('T')[0], // Convierte la fecha a 'YYYY-MM-DD'
      numeroLicencia: '',
      correo: '',
      telefono: '',
      especialidad: '',
      idUsuarioFK: 0,
      // otros campos según el modelo de Empleado
    };
    this.modalService.openModal(NuevoEmpleadoDialogoComponent, nuevoEmpleado);
    console.log(this.modalService);
  }
 
  

  /*filtrarEmpleados() {
    this.empleadosFiltrados = this.empleados.filter(empleado => {
      return (
        (!this.filtroFechaIngreso || empleado.fechaIngreso === this.filtroFechaIngreso) &&
        (!this.filtroRol || empleado.rol === this.filtroRol) &&
        (!this.filtroEspecialidad || empleado.especialidad === this.filtroEspecialidad)
      );
    });
  }

  openCreateModal(): void {
    this.modalService.openModal(EmpleadoDialogComponent);
  }*/
}
