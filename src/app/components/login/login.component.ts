import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
        this.loading = true;

        const { username, password } = this.loginForm.value; 
        this.loginService.login(username, password).subscribe(
            (response: any) => { 
                console.log('Inicio de sesión exitoso', response);
                this.router.navigate(['/cita']);
            },
            (error: any) => {
                this.errorMessage = 'Credenciales incorrectas';
                this.loading = false;
                console.error('Error en el inicio de sesión', error);
            }
        );
    }
}

  
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
