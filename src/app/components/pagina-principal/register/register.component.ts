import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { NavBarraComponent } from "../nav-barra/nav-barra.component";
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
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
      pass: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.passwordPattern)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  hasMinLength = false;
  hasUpperCase = false;
  hasLowerCase = false;
  hasNumber = false;
  hasSpecialChar = false;


  ngOnInit(): void {}

  checkPasswordStrength() {
    const password = this.registerForm.get('pass')?.value || '';
    
    this.hasMinLength = password.length >= 8;
    this.hasUpperCase = /[A-Z]/.test(password);
    this.hasLowerCase = /[a-z]/.test(password);
    this.hasNumber = /\d/.test(password);
    this.hasSpecialChar = /[@$!%*?&]/.test(password);
  }
  

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('pass')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get passwordErrors() {
    const passwordControl = this.registerForm.get('pass');
    if (passwordControl?.errors) {
      return {
        required: passwordControl.errors['required'],
        minlength: passwordControl.errors['minlength'],
        pattern: passwordControl.errors['pattern']
      };
    }
    return null;
  }

  register() {
    if (this.registerForm.valid) {
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
      alert('Formulario inválido. Por favor, revise los campos.');
    }
  }
}
