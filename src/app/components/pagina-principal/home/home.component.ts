import { Component, OnInit } from '@angular/core';
import { NavBarraComponent } from '../nav-barra/nav-barra.component';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { PiePaginaComponent } from "../../pie-de-pagina/pie-pagina/pie-pagina.component";
import { BarraBusquedaHomeComponent } from '../barra-busqueda-home/barra-busqueda-home.component'; // Importar el componente
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavBarraComponent,
    BreadcrumbsComponent,
    PiePaginaComponent,
    BarraBusquedaHomeComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  ngOnInit() {
  }

  constructor(private route: ActivatedRoute) {}

  ngAfterViewChecked(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

}
