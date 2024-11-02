import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    CommonModule
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

  ngOnInit(): void {
    // Puedes inicializar otros datos aquí si es necesario
  }

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
          // Almacena el usuario en localStorage
          localStorage.setItem('usuario', JSON.stringify(response.usuario));
          // Si es exitoso, redirige a la página principal
          this.router.navigate(['/principal']);
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      );
    }
  }
}
