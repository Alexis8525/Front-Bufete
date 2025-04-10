import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarraComponent } from '../nav-barra/nav-barra.component';
import { RecaptchaModule } from 'ng-recaptcha';

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
  errorMessage: string = '';
  successMessage: string = '';

  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  hasMinLength = false;
  hasUpperCase = false;
  hasLowerCase = false;
  hasNumber = false;
  hasSpecialChar = false;

  @ViewChild('successModal') successModal: any;
  @ViewChild('errorModal') errorModal: any;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.registerForm = this.fb.group({
      nombreCliente: ['', Validators.required],
      aPCliente: ['', Validators.required],
      aMCliente: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, this.phoneValidator]],
      pass: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', Validators.required],
      recaptcha: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return pattern.test(value) ? null : { passwordStrength: true };
  }

  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const phone = control.value;
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone) ? null : { invalidPhone: true };
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('pass')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  resolved(captchaResponse: string | null): void {
    if (captchaResponse) {
      this.captchaResolved = true;
      this.registerForm.patchValue({ recaptcha: captchaResponse });
    } else {
      this.captchaResolved = false;
    }
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

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
        idRolFK: 3,
      };

      this.clienteService.crearCliente(nuevoCliente).subscribe(
        (response) => {
          this.successMessage = 'Cliente registrado con éxito';
          this.openModal(this.successModal);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        (error) => {
          if (error.status === 400 && error.error.message === 'Este correo ya está registrado.') {
            this.errorMessage = 'Este correo ya está registrado. Por favor, utiliza otro correo.';
          } else {
            this.errorMessage = 'Hubo un error al registrar el cliente. Intenta nuevamente.';
          }
          this.openModal(this.errorModal);
        }
      );
    }
  }
}
