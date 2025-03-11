import { Component, OnInit } from '@angular/core';
import { NavBarraComponent } from "../nav-barra/nav-barra.component";
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { PiePaginaComponent } from "../../pie-de-pagina/pie-pagina/pie-pagina.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  standalone: true,
  imports: [NavBarraComponent, BreadcrumbsComponent, PiePaginaComponent],
})
export class ServiciosComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
  }

  
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
