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
  @Input() parts: string[] = [];
  @Input() activePage: string = '';
  url: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

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
    let currentRoute: ActivatedRoute | null = this.route.root; // Permitir que currentRoute sea null

    // Recorrer las rutas hijas mientras existan
    while (currentRoute) {
      // Verificar si hay un label de migas de pan en los datos de la ruta
      if (currentRoute.snapshot.data['breadcrumbLabel']) {
        this.parts.push(currentRoute.snapshot.data['breadcrumbLabel']);
      }
      
      // Mover al siguiente hijo, si existe
      currentRoute = currentRoute.firstChild;
    }

    // Asegurar que 'Inicio' esté al principio de las migas de pan
    if (!this.parts.includes('Inicio')) {
      this.parts.unshift('Inicio');
    }

    // Construir la URL de las migas de pan
    this.url = this.parts.map((part, index) => {
      return index === 0
        ? ''
        : this.url[index - 1] + '/' + part.toLowerCase().replace(/\s/g, '-');
    });
  }
}
