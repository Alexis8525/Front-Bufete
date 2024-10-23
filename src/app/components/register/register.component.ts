import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
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
    private authService: AuthService,
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
    const { username, password, confirmPassword, idRolFK } = this.registerForm.value;

    console.log('Datos a enviar:', { nombreUsuario: username, pass: password, estado: true, idRolFK });

    this.authService.register(username, password, idRolFK).subscribe(
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
