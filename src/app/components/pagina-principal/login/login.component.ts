import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarraComponent } from '../nav-barra/nav-barra.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbModal
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RecaptchaModule,
    NavBarraComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('modalPolitica') modalPolitica!: TemplateRef<any>;
  loginForm: FormGroup;
  captchaResolved: boolean = false;
  captchaToken: string = '';
  tempEmail: string = '';
  show2FAVerification: boolean = false;
  twoFactorForm: FormGroup;
  showPassword: boolean = false;
  errorMessage: string = '';

  showPasswordRequirements = false;
  hasMinLength = false;
  hasUpperCase = false;
  hasLowerCase = false;
  hasNumber = false;
  hasSpecialChar = false;
  politicaAceptada: boolean = false;


  @ViewChild('errorModal') errorModal: any;
  @ViewChild('modalSesionExpirada') modalSesionExpirada!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), this.passwordValidator],
      ],
      recaptcha: ['', Validators.required],
    });

    this.twoFactorForm = this.fb.group({
      otp: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      const reason = this.localStorageService.getItem('logoutReason');
      if (reason === 'expirada') {
        this.mostrarModalSesionExpirada();
        this.localStorageService.removeItem('logoutReason');
      }
    });
  }

  mostrarModalSesionExpirada() {
    console.log('🔔 Abriendo modal de sesión expirada');
    this.modalService.open(this.modalSesionExpirada, {
      backdrop: 'static',
      keyboard: false,
    });
  }
  
  checkPasswordStrength(password: string) {
    this.hasMinLength = password.length >= 8;
    this.hasUpperCase = /[A-Z]/.test(password);
    this.hasLowerCase = /[a-z]/.test(password);
    this.hasNumber = /\d/.test(password);
    this.hasSpecialChar = /[@$!%*?&]/.test(password);
  }

  onPasswordFocus() {
    this.showPasswordRequirements = true;
  }

  onPasswordBlur() {
    if (!this.loginForm.get('password')?.value) {
      this.showPasswordRequirements = false;
    }
  }

  onPasswordInput(event: any) {
    const password = event.target.value;
    this.checkPasswordStrength(password);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Validación de contraseña
  passwordValidator(control: any) {
    const password = control.value;
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!pattern.test(password)) {
      return { passwordStrength: true };
    }
    return null;
  }

  resolved(captchaResponse: string | null): void {
    if (captchaResponse) {
      this.captchaResolved = true;
      this.captchaToken = captchaResponse;
      this.loginForm.patchValue({ recaptcha: captchaResponse });
    } else {
      this.captchaResolved = false;
    }
  }

  // Función para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    // Primero verificar si ya aceptó la política
    if (!this.politicaAceptada) {
      const modalRef = this.modalService.open(this.modalPolitica, {
        backdrop: 'static',
        keyboard: false
      });
      
      // Aquí nos aseguramos de no continuar con el login
      return;
    }
    
    // Solo si la política está aceptada, continuar con el login normal
    console.log('Formulario de login enviado:', this.loginForm.value);
      
    if (this.loginForm.valid && this.captchaResolved) {
      const { email, password, recaptcha } = this.loginForm.value;
  
      this.usuarioService.login(email, password, recaptcha).subscribe(
        (response: any) => {
          console.log('OTP enviado:', response);
          this.tempEmail = email;
          this.show2FAVerification = true;
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          this.errorMessage = error.status === 401
            ? 'Credenciales incorrectas, por favor intenta nuevamente.'
            : error.error.message || 'Error al iniciar sesión. Por favor, intenta nuevamente.';
          this.openErrorModal();
        }
      );
    } else {
      this.errorMessage = 'Completa el reCAPTCHA antes de iniciar sesión.';
      this.openErrorModal();
    }
  }
  
  aceptarPolitica(modalRef: any) {
    this.politicaAceptada = true;
    modalRef.close();
    
    // Ahora ejecutamos el login directamente sin volver a verificar
    if (this.loginForm.valid && this.captchaResolved) {
      const { email, password, recaptcha } = this.loginForm.value;
  
      this.usuarioService.login(email, password, recaptcha).subscribe(
        (response: any) => {
          console.log('OTP enviado:', response);
          this.tempEmail = email;
          this.show2FAVerification = true;
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          this.errorMessage = error.status === 401
            ? 'Credenciales incorrectas, por favor intenta nuevamente.'
            : error.error.message || 'Error al iniciar sesión. Por favor, intenta nuevamente.';
          this.openErrorModal();
        }
      );
    } else {
      this.errorMessage = 'Completa el reCAPTCHA antes de iniciar sesión.';
      this.openErrorModal();
    }
  }
  

  // Abre el modal de error
  openErrorModal() {
    if (this.errorModal) {
      this.modalService.open(this.errorModal); // Pasa 'this.errorModal' como argumento
    } else {
      console.error('Error al intentar abrir el modal.');
    }
  }

  verify2FA() {
    const otp = this.twoFactorForm.value.otp;
    console.log('Verificando OTP:', otp);

    this.usuarioService.verifyOTP(this.tempEmail, otp).subscribe(
      (response: any) => {
        console.log('OTP verificado, respuesta del servidor:', response);
        this.finalizarLogin(response);
      },
      (error) => {
        console.error('Código incorrecto:', error);
        this.errorMessage = 'Código inválido o expirado. Intenta nuevamente.';
        this.openErrorModal(); // Abre el modal con el error
        this.twoFactorForm.reset(); // Reseteamos el formulario OTP
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

    this.localStorageService.setItem('usuarioId', usuarioId.toString());
    this.localStorageService.setItem('usuario', JSON.stringify(response.usuario));
    this.localStorageService.setItem('token', response.token);

    // Extraer expiración del token
    const tokenPayload = JSON.parse(atob(response.token.split('.')[1]));
    this.localStorageService.setItem('exp', (tokenPayload.exp * 1000).toString()); // en ms
    this.router.navigate(['/principal']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

}