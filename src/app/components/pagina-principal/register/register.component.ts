import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 

import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarraComponent } from '../nav-barra/nav-barra.component';
import { RecaptchaModule } from 'ng-recaptcha';  // Recaptcha

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NavBarraComponent,
    CommonModule,
    RecaptchaModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  captchaResolved: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  errorMessage: string = ''; // Para errores
  successMessage: string = ''; // Para mensaje de éxito

  // Declaramos las propiedades de los modales
  @ViewChild('successModal') successModal: any;  // Ref de modal de éxito
  @ViewChild('errorModal') errorModal: any;      // Ref de modal de error

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private modalService: NgbModal  // Inyectamos el servicio de modales
  ) {
    this.registerForm = this.fb.group({
      nombreCliente: ['', Validators.required],
      aPCliente: ['', Validators.required],
      aMCliente: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, this.phoneValidator]], // Validación del teléfono
      pass: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]], // Validación de la contraseña
      confirmPassword: ['', Validators.required],  // Confirmación de la contraseña
      recaptcha: ['', Validators.required],  // reCAPTCHA
    }, { validators: this.passwordMatchValidator });  // Validación de coincidencia de contraseñas
  }

  ngOnInit(): void {}

  // Mostrar u ocultar la contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Mostrar u ocultar la confirmación de la contraseña
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Validador de contraseña (debe contener al menos una mayúscula, una minúscula y un número)
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return pattern.test(value) ? null : { passwordStrength: true };
  }

  // Validador de coincidencia de contraseñas
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('pass')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Validador de teléfono (debe ser un número con 10 dígitos)
  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const phone = control.value;
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone) ? null : { invalidPhone: true };
  }

  // Llamada a reCAPTCHA para verificar la respuesta
  resolved(captchaResponse: string | null): void {
    if (captchaResponse) {
      this.captchaResolved = true;
      this.registerForm.patchValue({ recaptcha: captchaResponse });
    } else {
      this.captchaResolved = false;
    }
  }

  // Abrir el modal de éxito o error
  openModal(content: any) {
    this.modalService.open(content);  // Abre el modal correctamente
  }

  // Función de registro de cliente
  register() {
    if (this.registerForm.valid && this.captchaResolved) {
      const nuevoCliente: Cliente = {
        idCliente: 0,
        nombreCliente: this.registerForm.value.nombreCliente,
        aPCliente: this.registerForm.value.aPCliente,
        aMCliente: this.registerForm.value.aMCliente,
        direccion: this.registerForm.value.direccion,
        correo: this.registerForm.value.correo,
        telefono: this.registerForm.value.telefono,
        pass: this.registerForm.value.pass,
        idRolFK: 3, // Rol de cliente
      };

      this.clienteService.crearCliente(nuevoCliente).subscribe(
        (response) => {
          this.successMessage = 'Cliente registrado con éxito';
          this.openModal(this.successModal);  // Abre el modal de éxito
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);  // Redirige después de 3 segundos
        },
        (error) => {
          if (error.status === 400 && error.error.message === 'Este correo ya está registrado.') {
            this.errorMessage = 'Este correo ya está registrado. Por favor, utiliza otro correo.';
          } else {
            this.errorMessage = 'Hubo un error al registrar el cliente. Intenta nuevamente.';
          }
          this.openModal(this.errorModal);  // Abre el modal de error
        }
      );
    }
  }
}
