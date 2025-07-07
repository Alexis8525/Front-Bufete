import { Component, OnInit } from '@angular/core';
import { ExtraOptions, RouterModule } from '@angular/router';
import { NavBarraComponent } from '../nav-barra/nav-barra.component';
import { BreadcrumbsComponent } from '../../breadcrumbs/breadcrumbs.component';
import { PiePaginaComponent } from '../../pie-de-pagina/pie-pagina/pie-pagina.component';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled'
};

@Component({
  selector: 'app-mapa-sitio',
  templateUrl: './mapa-sitio.component.html',
  styleUrls: ['./mapa-sitio.component.css'],
  standalone: true,
  imports: [NavBarraComponent, BreadcrumbsComponent, PiePaginaComponent, RouterModule]
})
export class MapaSitioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
