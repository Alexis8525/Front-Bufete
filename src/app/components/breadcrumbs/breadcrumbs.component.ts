import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
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
  @Input() parts: string[] = [];
  @Input() activePage: string = '';
  url: string[] = [];
  private isBrowser: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.updateBreadcrumbs();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumbs();
      });
  }

  private updateBreadcrumbs(): void {
    this.parts = [];
    let currentRoute: ActivatedRoute | null = this.route.root;

    while (currentRoute) {
      if (currentRoute.snapshot.data['breadcrumbLabel']) {
        this.parts.push(currentRoute.snapshot.data['breadcrumbLabel']);
      }
      currentRoute = currentRoute.firstChild;
    }

    // 🔹 Verificación segura de autenticación
    const usuarioAutenticado = this.isBrowser 
      ? localStorage.getItem('usuario') !== null 
      : false; // Valor por defecto en SSR

    // 🔹 Establecer el primer breadcrumb dinámicamente
    const primerBreadcrumb = usuarioAutenticado ? 'Principal' : 'Inicio';

    // 🔹 Asegurar que el primer breadcrumb sea correcto
    if (this.parts.length === 0 || this.parts[0] !== primerBreadcrumb) {
      this.parts.unshift(primerBreadcrumb);
    }

    // 🔹 Construir la URL de las migas de pan
    this.url = this.parts.map((part, index) => {
      return index === 0 ? '' : this.url[index - 1] + '/' + part.toLowerCase().replace(/\s/g, '-');
    });
  }
}
