import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavBarraComponent } from '../nav-barra/nav-barra.component';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { PiePaginaComponent } from "../../pie-de-pagina/pie-pagina/pie-pagina.component";
import { NgFor } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavBarraComponent,
    BreadcrumbsComponent,
    PiePaginaComponent,
    NgFor
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  carouselItems = [
    {
      src: 'img_pagina_principal/img1.jpg',
      title: 'Asesoría Personalizada',
      description: 'Comprometidos con tu crecimiento, ofrecemos soluciones legales integrales que aseguran el futuro de tu empresa.',
      interval: 5000
    },
    {
      src: 'img_pagina_principal/img2.jpg',
      title: 'Lex Vargas Abogados',
      description: 'Con más de 40 años de experiencia, en LexVargas somos tu aliado estratégico.',
      interval: 3000
    },
    {
      src: 'img_pagina_principal/img3.png',
      title: 'Lex Vargas Abogados',
      description: 'En LexVargas, nuestro compromiso es tu éxito. A través de un enfoque integral y personalizado.',
      interval: 7000
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {  // Verifica si estamos en el navegador
      // Solo se carga Bootstrap en el navegador
      import('bootstrap').then((bootstrap) => {
        const carouselElement = document.querySelector('#carouselExample');
        if (carouselElement) {
          new bootstrap.Carousel(carouselElement, {
            interval: 5000,
            ride: 'carousel',
          });
        }
      }).catch((error) => {
        console.error("Error al cargar Bootstrap: ", error);
      });
    }
  }
}
