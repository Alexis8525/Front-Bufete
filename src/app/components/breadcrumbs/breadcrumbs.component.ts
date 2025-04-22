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
  @Input() parts: { label: string, url: string }[] = [];
  @Input() activePage: string = '';
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
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateBreadcrumbs());
  }

  private updateBreadcrumbs(): void {
    this.parts = [];
    let fullPath = '';
    let currentRoute: ActivatedRoute | null = this.route.root;

    while (currentRoute) {
      if (currentRoute.routeConfig && currentRoute.snapshot.data['breadcrumb']) {
        const path = currentRoute.routeConfig.path || '';
        const cleanPath = path.split('/:')[0]; // Quita los parámetros dinámicos
        fullPath += '/' + cleanPath;
        this.parts.push({
          label: currentRoute.snapshot.data['breadcrumb'],
          url: fullPath
        });
      }
      currentRoute = currentRoute.firstChild;
    }

    const usuarioAutenticado = this.isBrowser
      ? localStorage.getItem('usuario') !== null
      : false;

    const primerBreadcrumb = usuarioAutenticado
      ? { label: 'Principal', url: '/principal' }
      : { label: 'Inicio', url: '/home' };

    if (this.parts.length === 0 || this.parts[0].label !== primerBreadcrumb.label) {
      this.parts.unshift(primerBreadcrumb);
    }

    this.activePage = this.parts.length > 0
      ? this.parts[this.parts.length - 1].label
      : '';
  }
}