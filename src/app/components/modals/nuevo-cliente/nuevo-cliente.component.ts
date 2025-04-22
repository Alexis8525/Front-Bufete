import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm, Validators } from '@angular/forms';
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

  // Propiedad para la confirmación de contraseña
  confirmPassword: string = '';

  // Variables para mostrar/ocultar las contraseñas
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  // Método para manejar la creación del cliente
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // Verificar si las contraseñas coinciden
    if (this.cliente.pass !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Emitir el evento para crear el cliente
    this.crear.emit(this.cliente);
    form.reset();
    this.cerrarModal.emit(); // Cierra el modal después de crear
  }

  // Funciones para mostrar/ocultar contraseñas
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Validador para la contraseña (debe tener al menos una mayúscula, una minúscula, un número y mínimo 8 caracteres)
  passwordStrengthValidator(control: any) {
    const password = control.value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // Contraseña con minúscula, mayúscula, número y mínimo 8 caracteres
    return regex.test(password) ? null : { passwordStrength: true };
  }
}
