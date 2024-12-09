import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    BarraLateralComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.usuarioService.login(email, password).subscribe(
        (response: any) => {
          // Maneja la respuesta del servidor aquí
          console.log(response);

          // Verifica el rol del usuario y almacena los datos necesarios
          const usuarioId = response.usuario.rol === 2 || response.usuario.rol === 1 
            ? response.usuario.idEmpleado 
            : response.usuario.idCliente;

          const usuarioData = {
            id: usuarioId,
            rol: response.usuario.rol, // Guarda el rol del usuario
            nombre: response.usuario.nombre,
          };

          // Almacena el usuario y rol en el localStorage
          localStorage.setItem('usuario', JSON.stringify(usuarioData));
          console.log('Usuario guardado en localStorage:', usuarioData);

          // Redirige al componente principal
          this.router.navigate(['/principal']);
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
        }
      );
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
