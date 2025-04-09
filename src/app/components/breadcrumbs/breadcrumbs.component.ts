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
  @Input() activePage: string = '';
  breadcrumbs: Array<{ label: string, url: string }> = [];
  homeBreadcrumb: { label: string, url: string };
  private isBrowser: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.homeBreadcrumb = this.getHomeBreadcrumb();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      });
    
    // Inicializar breadcrumbs
    this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
  }

  private createBreadcrumbs(
    route: ActivatedRoute, 
    url: string = '', 
    breadcrumbs: Array<{ label: string, url: string }> = []
  ): Array<{ label: string, url: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumbLabel'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  private getHomeBreadcrumb(): { label: string, url: string } {
    const isAuthenticated = this.isBrowser ? localStorage.getItem('usuario') !== null : false;
    return isAuthenticated 
      ? { label: 'Principal', url: '/principal' } 
      : { label: 'Inicio', url: '/home' };
  }
}
