import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Cliente } from '../../../models/cliente'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class NuevoClienteComponent {
  @Output() crear = new EventEmitter<Cliente>();
  @Output() cerrarModal = new EventEmitter<void>();

  cliente: Cliente = {
    nombreCliente: '',
    aPCliente: '',
    aMCliente: '',
    direccion: '',
    correo: '',
    telefono: '',
    pass: '',
    idRolFK: 1
  };

  // Método para manejar la creación del cliente
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.crear.emit(this.cliente);
    form.reset();
    this.cerrarModal.emit(); // Cierra el modal después de crear
  }
}
