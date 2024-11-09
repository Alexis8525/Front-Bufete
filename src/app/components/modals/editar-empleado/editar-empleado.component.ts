import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Empleado } from '../../../models/empleados';
import { EmpleadoService } from '../../../services/empleado.service';
import { EspecialidadService } from '../../../services/especialidad.service'; // Importa el servicio de especialidades
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class EditarEmpleadoComponent implements OnInit {
  @Input() empleado: Empleado = {
    fechaIngreso: '',
    correo: '',
    nombreEmpleado: '',
    aPEmpleado: '',
    aMEmpleado: '',
    telefono: '',
    pass: '',
    idRolFK: 0,
    idEspecialidadFK: 0
  }; 

  @Output() empleadoActualizado = new EventEmitter<void>(); // Evento de actualización
  @Output() cerrarModal = new EventEmitter<void>(); // Evento para cerrar el modal

  especialidades: any[] = []; // Array para almacenar las especialidades disponibles

  constructor(
    private empleadoService: EmpleadoService,
    private especialidadService: EspecialidadService // Inyecta el servicio de especialidades
  ) {}

  ngOnInit(): void {
    this.cargarEspecialidades(); // Carga las especialidades al iniciar el componente
  }

  // Método para cargar las especialidades
  cargarEspecialidades(): void {
    this.especialidadService.getEspecialidades().subscribe(
      res => {
        this.especialidades = res;
      },
      err => console.error('Error al cargar especialidades:', err)
    );
  }

  // Método para actualizar el empleado
  actualizarEmpleado(form: NgForm): void {
    if (this.empleado) {
      this.empleadoService.actualizarEmpleado(this.empleado).subscribe(
        res => {
          console.log('Empleado actualizado exitosamente', res);
          this.empleadoActualizado.emit(); // Emite evento para actualizar la lista de empleados
          this.cerrarModal.emit(); // Emite evento para cerrar el modal
        },
        err => {
          console.error('Error al actualizar empleado:', err);
          alert('Error al actualizar empleado: ' + err.message);
        }
      );
    }
  }

  // Método para cerrar el modal sin guardar cambios
  cancelarEdicion(): void {
    this.cerrarModal.emit();
  }
}
