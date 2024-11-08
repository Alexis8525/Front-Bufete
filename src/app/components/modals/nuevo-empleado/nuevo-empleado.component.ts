import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EspecialidadService } from '../../../services/especialidad.service';
import { RolService } from '../../../services/rol.service';
import { Empleado } from '../../../models/empleados';

@Component({
  selector: 'app-nuevo-empleado',
  templateUrl: './nuevo-empleado.component.html',
  styleUrls: ['./nuevo-empleado.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class NuevoEmpleadoComponent implements OnInit {
  @Output() crear = new EventEmitter<Empleado>();
  @Output() cerrarModal = new EventEmitter<void>();

  empleado: Empleado = {
    fechaIngreso: '',
    correo: '',
    nombreEmpleado: '',
    aPEmpleado: '',
    aMEmpleado: '',
    telefono: '',
    pass: '',
    idRolFK: 0,
    idEspecialidadFK: 0,
  };

  especialidades: any[] = []; // Array para almacenar especialidades
  roles: any[] = []; // Array para almacenar roles

  constructor(
    public especialidadService: EspecialidadService,
    public rolService: RolService
  ) {}

  ngOnInit(): void {
    this.cargarEspecialidades();
    this.cargarRoles();
  }

  cargarEspecialidades() {
    this.especialidadService.getEspecialidades().subscribe(
      (res) => {
        this.especialidades = res; // Asigna las especialidades a la variable local
      },
      (err) => console.error('Error al cargar especialidades:', err)
    );
  }

  cargarRoles() {
    this.rolService.getRoles().subscribe(
      (res) => {
        this.roles = res; // Asigna los roles a la variable local
      },
      (err) => console.error('Error al cargar roles:', err)
    );
  }

  onSubmit(form: NgForm) {
    this.crear.emit(this.empleado);
    form.reset();
    this.cerrarModal.emit(); // Cierra el modal después de crear
  }
}
