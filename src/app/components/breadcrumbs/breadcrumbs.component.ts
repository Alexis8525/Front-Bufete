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
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateBreadcrumbs());
  }

  private updateBreadcrumbs(): void {
    this.parts = [];
    let fullPath = '/home';
    let currentRoute: ActivatedRoute | null = this.route.root;

    while (currentRoute) {
      const label = currentRoute.snapshot.data['breadcrumbLabel'];
      if (label) {
        const segment = currentRoute.snapshot.url.map(seg => seg.path).join('/');
        fullPath += '/' + segment;
        this.parts.push({ label, url: fullPath });
      }
      currentRoute = currentRoute.firstChild;
    }

    const usuarioAutenticado = this.isBrowser
      ? localStorage.getItem('usuario') !== null
      : false;

    const primerBreadcrumb = usuarioAutenticado
      ? { label: 'Principal', url: '/' }
      : { label: 'Inicio', url: '/' };

    if (this.parts.length === 0 || this.parts[0].label !== primerBreadcrumb.label) {
      this.parts.unshift(primerBreadcrumb);
    }

    let accumulatedPath = '';
    this.url = this.parts.map((part, index) => {
      if (index === 0) {
        accumulatedPath = '';
      } else {
        accumulatedPath += '/' + part.label.toLowerCase().replace(/\s/g, '-');
      }
      return accumulatedPath;
    });
  }
}
