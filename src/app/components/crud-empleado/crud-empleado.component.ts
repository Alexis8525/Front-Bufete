import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { Empleado } from '../../models/empleados';
import { EmpleadoService } from '../../services/empleado.service';
import { NgForm } from '@angular/forms';
import { RolService } from '../../services/rol.service';
import { EspecialidadService } from '../../services/especialidad.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-empleado',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './crud-empleado.component.html',
  styleUrls: ['./crud-empleado.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class CrudEmpleadoComponent implements OnInit {
  constructor(
    public empleadoService: EmpleadoService,
    public rolService: RolService,
    public especialidadService: EspecialidadService,
  ) { }

  ngOnInit(): void {
    this.getEmpleados();
    this.getRoles();
    this.getEspecialidades();
  }

  getEmpleados() {
    this.empleadoService.getEmpleados().subscribe(
      res => {
        this.empleadoService.empleados = res;
      },
      err => console.log(err)
    )
  }

  getRoles() {
    this.rolService.getRoles().subscribe(
      res => {
        this.rolService.roles = res;
      },
      err => console.log(err)
    )
  }

  getEspecialidades() {
    this.especialidadService.getEspecialidades().subscribe(
      res => {
        this.especialidadService.especialidades = res;
      },
      err => console.log(err)
    )
  }

  crearEmpleado(form: NgForm) {
    const nuevoEmpleado: Empleado = {
      fechaIngreso: form.value.fechaIngreso,
      numeroLicencia: form.value.numeroLicencia,
      correo: form.value.correo,
      nombreEmpleado: form.value.nombre,
      aPEmpleado: form.value.apellidoP,
      aMEmpleado: form.value.apellidoM,
      telefono: form.value.telefono,
      pass: form.value.contrasena,
      idRolFK: form.value.rol,
      idEspecialidadFK: form.value.especialidad
    };

    console.log('Valores del formulario:', nuevoEmpleado); // Verifica qué datos se están enviando

    this.empleadoService.crearEmpleado(nuevoEmpleado).subscribe(
      res => {
        console.log('Respuesta del servidor:', res);
        this.getEmpleados(); // Actualiza la lista de empleados
        form.reset(); // Resetea el formulario
      },
      err => {
        console.error('Error al crear empleado:', err);
        alert('Error al crear empleado: ' + err.message); // Muestra un mensaje de error
      }
    );
  }

  actualizarEmpleado(form: NgForm) {
    const empleadoId = this.empleadoService.empleado.idEmpleado;

    if (!empleadoId) {
      alert('ID de empleado no encontrado.');
      return;
    }

    const empleadoActualizado: Empleado = {
      idEmpleado: empleadoId,
      fechaIngreso: form.value.fechaIngreso,
      numeroLicencia: form.value.numeroLicencia,
      correo: form.value.correo,
      nombreEmpleado: form.value.nombre,
      aPEmpleado: form.value.apellidoP,
      aMEmpleado: form.value.apellidoM,
      telefono: form.value.telefono,
      pass: form.value.contrasena,
      idRolFK: form.value.rol,
      idEspecialidadFK: form.value.especialidad
    };

    this.empleadoService.actualizarEmpleado(empleadoActualizado).subscribe(
      res => {
        console.log('Empleado actualizado:', res);
        this.getEmpleados(); // Actualiza la lista de empleados
        form.reset(); // Resetea el formulario
      },
      err => {
        console.error('Error al actualizar empleado:', err);
        alert('Error al actualizar empleado: ' + err.message);
      }
    );
  }

  editarEmpleado(itemE: any) {
    this.empleadoService.empleado = { ...itemE };
    console.log('Empleado a editar:', this.empleadoService.empleado); 
  }

  formReset(form: NgForm) {
    this.empleadoService.empleado = form.value;
    form.reset();
  }




}
