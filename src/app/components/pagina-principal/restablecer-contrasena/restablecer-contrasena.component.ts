import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.component.html',
  styleUrls: ['./restablecer-contrasena.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class RestablecerContrasenaComponent implements OnInit {

  form: FormGroup;
  token: string = ''; // Token recibido desde el enlace de recuperación de contraseña
  errorMessage: string = ''; // Mensaje de error
  successMessage: string = ''; // Mensaje de éxito
  showPassword: boolean = false; // Controla la visibilidad de la nueva contraseña
  showConfirmPassword: boolean = false; // Controla la visibilidad de la confirmación de contraseña

  @ViewChild('successModal') successModal: any;
  @ViewChild('errorModal') errorModal: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private modalService: NgbModal
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', [Validators.required, this.matchPassword('password')]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token']; // Token obtenido de la URL
    });
  }

  passwordValidator(control: any) {
    const password = control.value;
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!pattern.test(password)) {
      return { passwordStrength: true }; // Si no pasa la validación, retorna el error
    }
    return null; // Si pasa la validación, no hay errores
  }

  // Validación cruzada para la confirmación de la contraseña
  matchPassword(passwordKey: string) {
    return (control: any) => {
      const password = control.root.get(passwordKey);
      if (password && control.value !== password.value) {
        return { match: true };  // Retorna el error si no coinciden
      }
      return null; // Si coinciden, no hay error
    };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    const { password, confirmPassword } = this.form.value;

    // Si el formulario es inválido
    if (this.form.invalid) {
      this.errorMessage = 'Por favor, completa correctamente los campos';
      return;
    }

    // Llamada al servicio para restablecer la contraseña
    this.usuarioService.restablecerContrasena(this.token, password).subscribe({
      next: (res) => {
        this.successMessage = '¡Contraseña restablecida con éxito!';
        this.errorMessage = ''; // Limpiar mensaje de error
        this.openModal(this.successModal); // Abre el modal de éxito
        
        // Cerrar el modal antes de redirigir al login
        setTimeout(() => {
          this.modalService.dismissAll(); // Cierra todos los modales abiertos
          this.router.navigate(['/login']); // Redirige al login
        }, 2000); // Redirige después de 2 segundos
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Ocurrió un error';
        this.successMessage = '';
        this.openModal(this.errorModal); // Abre el modal de error
      }
    });
  }

  openModal(content: any) {
    this.modalService.open(content);  // Abre el modal de éxito o error
  }
}
