import { Component, OnInit } from '@angular/core';
import { NavBarraComponent } from '../nav-barra/nav-barra.component';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { PiePaginaComponent } from '../../pie-de-pagina/pie-pagina/pie-pagina.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.component.html',
  styleUrls: ['./conocenos.component.css'],
  standalone: true,
  imports: [
    NavBarraComponent,
    BreadcrumbsComponent, 
    PiePaginaComponent
]
})
export class ConocenosComponent implements OnInit {


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
