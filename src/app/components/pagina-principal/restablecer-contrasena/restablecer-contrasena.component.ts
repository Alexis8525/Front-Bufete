import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.component.html',
  styleUrls: ['./restablecer-contrasena.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class RestablecerContrasenaComponent implements OnInit {

  form: FormGroup;
  token: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    // Validación mínima para que no estén vacíos
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
      console.log('Token recibido:', this.token);
    });
  }

  // Método de debug para imprimir el valor actual del formulario
  debugForm(): void {
    console.log('Valor actual del formulario:', this.form.value);
  }

  onSubmit(): void {
    console.log('Formulario enviado');

    const { password, confirmPassword } = this.form.value;

    console.log('Contraseña:', password);
    console.log('Confirmar Contraseña:', confirmPassword);

    if (password !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      console.log(this.errorMessage);
      return;
    }

    if (this.form.invalid) {
      console.log('Formulario inválido');
      this.errorMessage = 'Debes llenar correctamente ambos campos.';
      return;
    }

    // Enviar al backend
    this.usuarioService.restablecerContrasena(this.token, password).subscribe({
      next: (res) => {
        console.log('Respuesta del backend:', res);
        this.successMessage = '¡Contraseña restablecida con éxito!';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Ocurrió un error';
        this.successMessage = '';
        console.error('Error en restablecer:', err);
      }
    });
  }
}
