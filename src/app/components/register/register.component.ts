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
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
  
    this.loading = true;
    const { username, password } = this.registerForm.value;
  
    this.authService.register(username, password).subscribe(
      (response: any) => {
        console.log('Registro exitoso', response.message);
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
