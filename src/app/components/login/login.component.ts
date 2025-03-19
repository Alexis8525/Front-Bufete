import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { CommonModule } from '@angular/common';
import { NavBarraComponent } from '../pagina-principal/nav-barra/nav-barra.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { PiePaginaComponent } from '../pie-de-pagina/pie-pagina/pie-pagina.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    BarraLateralComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NavBarraComponent, BreadcrumbsComponent, PiePaginaComponent
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
    // this.usuarioService.getUsuarios().subscribe({
    //   next: (usuarios) => console.log('Usuarios:', usuarios),
    //   error: (err) => console.error('Error al obtener usuarios:', err.message),
    // });
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

          // Verifica el rol y almacena el ID correspondiente
          let usuarioId: string;
          if (response.usuario.rol === 2 || response.usuario.rol === 1) { 
            usuarioId = response.usuario.idEmpleado; // Almacena idEmpleado
          } else {
            usuarioId = response.usuario.idCliente; // Almacena idCliente
          }


          console.log('ID guardado en localStorage:', usuarioId);
          localStorage.setItem('usuarioId', usuarioId.toString()); // Asegúrate de convertir a cadena
          localStorage.setItem('usuario', JSON.stringify(response.usuario));

          // Si es exitoso, redirige a la página principal
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
