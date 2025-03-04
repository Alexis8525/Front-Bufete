import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    // Observamos los cambios en la ruta para actualizar las migas de pan
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateBreadcrumbs(this.route.root);
    });
  }

  private updateBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): void {
    const children: ActivatedRoute[] = route.children;

    // Si no hay hijos, mostramos las migas de pan acumuladas
    if (children.length === 0) {
      this.breadcrumbs = breadcrumbs;
      return;
    }

    // Iteramos sobre los hijos para generar las rutas
    children.forEach(child => {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      // Leemos el breadcrumbLabel desde 'data'
      const breadcrumbLabel = child.snapshot.data['breadcrumbLabel'] || routeURL.charAt(0).toUpperCase() + routeURL.slice(1);

      if (routeURL !== '') {
        const newBreadcrumb = {
          label: breadcrumbLabel,
          url: url + '/' + routeURL
        };
        // Llamada recursiva para procesar los hijos
        this.updateBreadcrumbs(child, newBreadcrumb.url, [...breadcrumbs, newBreadcrumb]);
      }
    });
  }
}
