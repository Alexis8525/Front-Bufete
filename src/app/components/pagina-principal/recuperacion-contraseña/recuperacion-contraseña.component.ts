import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperacion-contraseña',
  templateUrl: './recuperacion-contraseña.component.html',
  styleUrls: ['./recuperacion-contraseña.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class RecuperacionContraseñaComponent implements OnInit {
  recuperarForm: FormGroup;
  enviado: boolean = false;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  enviarCorreo() {
    if (this.recuperarForm.valid) {
      const email = this.recuperarForm.value.email;
      this.usuarioService.enviarCorreoRecuperacion(email).subscribe(
        () => {
          this.enviado = true;
        },
        (error) => {
          console.error('Error al enviar email:', error);
          alert('No se pudo enviar el correo. Verifica tu email.');
        }
      );
    }
  }
}
