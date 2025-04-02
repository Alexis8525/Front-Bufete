import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class BreadcrumbsComponent implements OnInit {
  @Input() parts: { label: string, url: string }[] = [];
  @Input() activePage: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.updateBreadcrumbs();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateBreadcrumbs();
    });
  }

  private updateBreadcrumbs(): void {
    this.parts = [];
    let currentRoute: ActivatedRoute | null = this.route.root;
    let fullPath = '';
  
    while (currentRoute) {
      if (currentRoute.snapshot.data['breadcrumbLabel']) {
        fullPath += '/' + currentRoute.snapshot.url.map(segment => segment.path).join('/');
        this.parts.push({ label: currentRoute.snapshot.data['breadcrumbLabel'], url: fullPath });
      }
      currentRoute = currentRoute.firstChild;
    }
  
    // Verificar si el usuario está autenticado
    const usuarioAutenticado = !!localStorage.getItem('token'); // Usa un servicio en producción
  
    // Definir el breadcrumb raíz según el estado del usuario
    const breadcrumbRoot = usuarioAutenticado
      ? { label: 'Principal', url: '/principal' }
      : { label: 'Inicio', url: '/home' };
  
    // Insertar el primer breadcrumb correctamente
    if (!this.parts.length || this.parts[0].url !== breadcrumbRoot.url) {
      this.parts.unshift(breadcrumbRoot);
    }
  
    // Actualizar activePage con el último breadcrumb visible
    this.activePage = this.parts.length > 0 ? this.parts[this.parts.length - 1].label : '';
  }
  
}
