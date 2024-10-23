import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      idRolFK: [1, Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
  
    this.loading = true;
    const { username, password, idRolFK } = this.registerForm.value;
  
    const user = {
      nombreUsuario: username,
      pass: password,
      estado: true,
      idRolFK: idRolFK,
    };
  
    console.log('Datos a enviar:', user);
  
    this.registerService.register(user).subscribe(
      (response: any) => {
        alert('Registro exitoso');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = error.error?.message || 'Error en el registro';
        this.loading = false;
        console.error('Error en el registro', error);
      }
    );
  }
}
