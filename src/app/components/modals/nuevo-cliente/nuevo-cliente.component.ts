import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Cliente } from '../../../models/cliente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css'],
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ]
})
export class NuevoClienteComponent implements OnInit {
  @Output() crear = new EventEmitter<Cliente>();
  @Output() cerrarModal = new EventEmitter<void>();

  // Datos del cliente
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

  // Confirmación de contraseña
  confirmPassword: string = '';
  contrasenaCoincide: boolean = true;

  // Mostrar/ocultar contraseña
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  // Método para resetear los campos del cliente a sus valores iniciales
  resetCliente() {
    this.cliente = {
      nombreCliente: '',
      aPCliente: '',
      aMCliente: '',
      direccion: '',
      correo: '',
      telefono: '',
      pass: '',
      idRolFK: 1
    };
    this.confirmPassword = '';
    this.contrasenaCoincide = true;
  }

  // Método que se ejecuta al iniciar el componente (cuando se abre el modal)
  ngOnInit() {
    this.resetCliente(); // Limpiar los campos al abrir el modal
  }

  // Método para mostrar u ocultar la contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Validación en tiempo real para coincidencia de contraseñas
  validarCoincidenciaContrasena(): void {
    this.contrasenaCoincide = this.cliente.pass === this.confirmPassword;
  }

  // Envío del formulario
  onSubmit(form: NgForm): void {
    if (form.invalid || !this.contrasenaCoincide) {
      return;
    }

    this.crear.emit({ ...this.cliente });
    this.resetCliente();  // Limpiar después de enviar
  }

  // Método que cierra el modal y limpia los campos
  cerrarModalEmit() {
    this.resetCliente();  // Limpiar los campos
    this.cerrarModal.emit();
  }
}
