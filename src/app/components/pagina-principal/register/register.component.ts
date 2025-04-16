import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { NavBarraComponent } from "../nav-barra/nav-barra.component";
import { CommonModule } from '@angular/common';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NavBarraComponent,
    CommonModule,
    RecaptchaModule // 👈 reCAPTCHA agregado
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  captchaResolved: boolean = false;
  captchaToken: string = '';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
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
      confirmPassword: ['', Validators.required],
      recaptcha: ['', Validators.required] // 👈 Campo captcha
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('pass')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  resolved(captchaResponse: string | null): void {
    if (captchaResponse) {
      console.log(`Captcha resuelto: ${captchaResponse}`);
      this.captchaResolved = true;
      this.captchaToken = captchaResponse;
      this.registerForm.patchValue({ recaptcha: captchaResponse });
    } else {
      this.captchaResolved = false;
    }
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
        idRolFK: 3
      };

      this.clienteService.crearCliente(nuevoCliente).subscribe(
        response => {
          console.log('Cliente registrado exitosamente:', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error al registrar cliente:', error);
          alert('Error al registrar cliente');
        }
      );
    } else {
      alert('Formulario inválido o reCAPTCHA no verificado.');
    }
  }
}
