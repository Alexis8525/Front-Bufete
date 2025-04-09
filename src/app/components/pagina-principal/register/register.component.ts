import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';  // Asegúrate de que la ruta sea correcta
import { Cliente } from '../../../models/cliente';
import { NavBarraComponent } from "../nav-barra/nav-barra.component";  // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NavBarraComponent,
    CommonModule
]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,  // Usa ClienteService
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombreCliente: ['', Validators.required],
      aPCliente: ['', Validators.required],
      aMCliente: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      pass: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  // Validador de que las contraseñas coincidan
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('pass')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Método para registrar el cliente
  register() {
    if (this.registerForm.valid) {
      const nuevoCliente: Cliente = {
        idCliente: 0,  // En tu backend podría auto-generarse
        nombreCliente: this.registerForm.value.nombreCliente,
        aPCliente: this.registerForm.value.aPCliente,
        aMCliente: this.registerForm.value.aMCliente,
        direccion: this.registerForm.value.direccion,
        correo: this.registerForm.value.correo,
        telefono: this.registerForm.value.telefono,
        pass: this.registerForm.value.pass,  // Contraseña (asegúrate de manejarla de forma segura)
        idRolFK: 3,  // O el valor que corresponda para el rol del cliente
      };

      // Llamar al servicio para crear el cliente
      this.clienteService.crearCliente(nuevoCliente).subscribe(
        response => {
          console.log('Cliente registrado exitosamente:', response);
          this.router.navigate(['/login']);  // Redirigir al login u otra página
        },
        error => {
          console.error('Error al registrar cliente:', error);
          alert('Error al registrar cliente');
        }
      );
    } else {
      alert('Formulario inválido. Por favor, revise los campos.');
    }
  }
}
