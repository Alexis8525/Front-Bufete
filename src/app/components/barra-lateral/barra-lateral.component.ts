import { Component, ElementRef, Renderer2, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.css']
})
export class BarraLateralComponent {
  @ViewChild('sidebar') sidebarRef!: ElementRef;  // Referencia a la barra lateral
  private isBrowser: boolean;  // Verifica si estamos en el navegador
  public isExpanded: boolean = false;  // Estado para saber si el sidebar está expandido
  public rol: number | null = null;  // Cambiado a tipo number para ID del rol

  constructor(
    private renderer: Renderer2, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private router:Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);  // Verifica si estamos en el navegador
    this.rol = this.getRol();  // Obtiene el ID del rol del usuario
  }
  toggleSidebar(): void {
    // Solo ejecutar este código si estamos en el navegador
    if (this.isBrowser) {
      const sidebar = this.sidebarRef.nativeElement; // Usar ElementRef para acceder al elemento
      if (this.isExpanded) {
        this.renderer.removeClass(sidebar, 'expand'); // Remover clase 'expand'
      } else {
        this.renderer.addClass(sidebar, 'expand'); // Agregar clase 'expand'
      }
      this.isExpanded = !this.isExpanded; // Alternar el estado
    }
  }
 
  private getRol(): number | null {
    if (this.isBrowser) { // Verifica si estamos en el navegador
      const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
      return usuario ? usuario.rol : null;  // Devuelve el ID del rol
    }
    return null; // Devuelve null si no está en el navegador
  }

  // Métodos para verificar el rol
  public isAbogado(): boolean {
    return this.rol === 2;
  }

  public isCliente(): boolean {
    return this.rol === 3;
  }

  public isSecretaria(): boolean {
    return this.rol === 1;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('usuario'); // Eliminar el usuario de localStorage
      this.router.navigate(['/login']); // Redirigir a la página de login
    }
  }
  
}
