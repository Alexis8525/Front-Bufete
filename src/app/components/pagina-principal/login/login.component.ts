import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarraComponent } from '../nav-barra/nav-barra.component';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RecaptchaModule,
    NavBarraComponent,
    RouterLink,
    ReactiveFormsModule
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  captchaResolved: boolean = false; 
  captchaToken: string = '';
  tempEmail: string = '';
  show2FAVerification: boolean = false;
  twoFactorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required],
    });
    // Inicializar formulario de 2FA
    this.twoFactorForm = this.fb.group({
      otp: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
  }

  ngOnInit(): void {}

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
    console.log('Formulario de login enviado:', this.loginForm.value);

    if (this.loginForm.valid && this.captchaResolved) {
      const { email, password, recaptcha } = this.loginForm.value;

      this.usuarioService.login(email, password, recaptcha).subscribe(
        (response: any) => {
          console.log('OTP enviado:', response);

          // Redirige a la verificación 2FA sin cambiar de página
          this.tempEmail = email;
          this.show2FAVerification = true; // Muestra el formulario de OTP en la misma página
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
        }
      );
    } else {
      alert('Completa el reCAPTCHA antes de iniciar sesión.');
    }
  }

  verify2FA() {
    const otp = this.twoFactorForm.value.otp;
    console.log('Verificando OTP:', otp);

    this.usuarioService.verifyOTP(this.tempEmail, otp).subscribe(
      (response: any) => {
        console.log('OTP verificado, respuesta del servidor:', response);
        this.finalizarLogin(response); // Solo finaliza si el OTP es correcto
      },
      (error) => {
        console.error('Código incorrecto:', error);
        alert('Código inválido o expirado. Intenta nuevamente.');
        this.twoFactorForm.reset();
      }
    );
  }

  finalizarLogin(response: any) {
    let usuarioId: string;
    if (response.usuario.rol === 2 || response.usuario.rol === 1) {
      usuarioId = response.usuario.idEmpleado;
    } else {
      usuarioId = response.usuario.idCliente;
    }
  
    localStorage.setItem('usuarioId', usuarioId.toString());
    localStorage.setItem('usuario', JSON.stringify(response.usuario));
    localStorage.setItem('token', response.token);

    // Extraer expiración del token
  const tokenPayload = JSON.parse(atob(response.token.split('.')[1]));
  localStorage.setItem('exp', (tokenPayload.exp * 1000).toString()); // en ms
  
    // Ver en consola lo que se guardó en localStorage
    console.log('Usuario guardado en localStorage:', localStorage.getItem('usuario'));
    console.log('UsuarioId guardado en localStorage:', localStorage.getItem('usuarioId'));
  
    this.router.navigate(['/principal']);
  }
  

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
