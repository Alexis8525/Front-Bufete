import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { CommonModule } from '@angular/common';
import { RecaptchaModule } from 'ng-recaptcha';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RecaptchaModule
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  captchaResolved: boolean = false; // Variable para habilitar/deshabilitar el botón de login
  captchaToken: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
   
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  resolved(captchaResponse: string | null): void {
    if (captchaResponse) { 
      console.log(`Captcha resuelto: ${captchaResponse}`);
      this.captchaResolved = true;
      this.captchaToken = captchaResponse;
      this.loginForm.patchValue({ recaptcha: captchaResponse });
    } else {
      this.captchaResolved = false; 
    } 
  }
  

  login() {
    if (this.loginForm.valid && this.captchaResolved) {
      const { email, password, recaptcha } = this.loginForm.value;

      console.log("Enviando login con recaptcha:", recaptcha); 

      this.usuarioService.login(email, password, recaptcha).subscribe(
        (response: any) => {
          console.log(response);

          let usuarioId: string;
          if (response.usuario.rol === 2 || response.usuario.rol === 1) {
            usuarioId = response.usuario.idEmpleado;
          } else {
            usuarioId = response.usuario.idCliente;
          }

          localStorage.setItem('usuarioId', usuarioId.toString());
          localStorage.setItem('usuario', JSON.stringify(response.usuario));

          this.router.navigate(['/principal']);
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
        }
      );
    } else {
      alert('Por favor, completa el reCAPTCHA antes de iniciar sesión.');
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}