import {
  Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, ElementRef, ViewChild, Renderer2
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarraComponent } from '../nav-barra/nav-barra.component';
import { BreadcrumbsComponent } from '../../breadcrumbs/breadcrumbs.component';
import { PiePaginaComponent } from '../../pie-de-pagina/pie-pagina/pie-pagina.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavBarraComponent,
    BreadcrumbsComponent,
    PiePaginaComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('contenedorResenas') contenedorResenas!: ElementRef;

  // Lista de clientes con nombre completo y correo
  clientes = [
    { idCliente: 100001, nombreCliente: "Carlos", aPCliente: "Lopez", aMCliente: "Hernandez", correo: "carlos@example.com" },
    { idCliente: 100002, nombreCliente: "Maria", aPCliente: "Martinez", aMCliente: "Pérez", correo: "maria@example.com" },
    { idCliente: 100003, nombreCliente: "Jose", aPCliente: "Sanchez", aMCliente: "Lopez", correo: "jose@example.com" },
    { idCliente: 100004, nombreCliente: "Lucia", aPCliente: "Gonzalez", aMCliente: "Mora", correo: "lucia@example.com" },
    { idCliente: 100005, nombreCliente: "Antonio", aPCliente: "Fernandez", aMCliente: "Hernandez", correo: "antonio@example.com" },
    { idCliente: 100006, nombreCliente: "Cristel", aPCliente: "Ramirez", aMCliente: "Romero", correo: "cristel23rr@gmail.com" },
    { idCliente: 100007, nombreCliente: "Edu", aPCliente: "Gonzalez", aMCliente: "Ortiz", correo: "eduardo@gmail.com" },
    { idCliente: 100008, nombreCliente: "Schos", aPCliente: "Palomares", aMCliente: "Barrientos", correo: "schos@gmail.com" },
    { idCliente: 100011, nombreCliente: "Cristel", aPCliente: "Ramirez", aMCliente: "Romero", correo: "cristel239rr@gmail.com" },
    { idCliente: 100012, nombreCliente: "Cristel", aPCliente: "Ramirez", aMCliente: "Romero", correo: "cristel28rr@gmail.com" },
    { idCliente: 100013, nombreCliente: "Cristel", aPCliente: "Ramirez", aMCliente: "Romero", correo: "cristel23mrr@gmail.com" },
    { idCliente: 100014, nombreCliente: "Cristel", aPCliente: "Ramirez", aMCliente: "Romero", correo: "cristel2m3rr@gmail.com" },
    { idCliente: 100015, nombreCliente: "Cristel", aPCliente: "Ramirez", aMCliente: "Romero", correo: "cristel23r2r@gmail.com" },
    { idCliente: 100016, nombreCliente: "María Teresa", aPCliente: "Díaz", aMCliente: "Robledo", correo: "tere.diaz.utng@gmail.com" },
    { idCliente: 100017, nombreCliente: "Migui", aPCliente: "Rodriguez", aMCliente: "Ramirez", correo: "migui@gmail.com" },
    { idCliente: 100018, nombreCliente: "Eduardo", aPCliente: "González", aMCliente: "Ortiz", correo: "eduardo4t8@gmail.com" },
    { idCliente: 100019, nombreCliente: "Brayan", aPCliente: "Palma", aMCliente: "Aboytes", correo: "aboytes_palma@icloud.com" }
  ];

  carouselItems = [
    {
      src: 'img_pagina_principal/img1.jpg',
      title: 'Asesoría Personalizada',
      description: 'Soluciones legales integrales para tu empresa.',
      interval: 5000
    },
    {
      src: 'img_pagina_principal/img2.jpg',
      title: 'Lex Vargas Abogados',
      description: 'Con más de 40 años de experiencia.',
      interval: 3000
    },
    {
      src: 'img_pagina_principal/img3.png',
      title: 'Compromiso Total',
      description: 'Atención personalizada y resultados efectivos.',
      interval: 7000
    }
  ];

  // Reseñas con contador de likes
  resenas: { nombre: string; comentario: string; estrellas: number; likes: number }[] = [];
  nuevaResena = { comentario: '', correo: '', estrellas: 5 };

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const resenasGuardadas = localStorage.getItem('resenas');
      if (resenasGuardadas) {
        this.resenas = JSON.parse(resenasGuardadas).map((r: any) => ({
          ...r,
          likes: r.likes ?? 0
        }));
      } else {
        this.resenas = [
          { nombre: 'Cristina Herrera', comentario: 'Excelente atención legal.', estrellas: 5, likes: 23 },
          { nombre: 'Ernesto Pérez', comentario: 'Muy profesionales.', estrellas: 4, likes: 10 },
          { nombre: 'Fernanda Ríos', comentario: 'Atención rápida y efectiva.', estrellas: 5, likes: 18 }
        ];
        localStorage.setItem('resenas', JSON.stringify(this.resenas));
      }
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('bootstrap').then((bootstrap) => {
        const carouselElement = document.querySelector('#carouselExample');
        if (carouselElement) {
          new bootstrap.Carousel(carouselElement, {
            interval: 5000,
            ride: 'carousel',
          });
        }
      });
    }
  }

  agregarResena(): void {
    const { comentario, correo, estrellas } = this.nuevaResena;

    if (!comentario.trim() || !correo.trim()) {
      alert('Por favor completa todos los campos antes de enviar tu reseña.');
      return;
    }

    const clienteExistente = this.clientes.find(cliente => cliente.correo === correo);

    if (clienteExistente) {
      const nombreCompleto = `${clienteExistente.nombreCliente} ${clienteExistente.aPCliente} ${clienteExistente.aMCliente}`;
      const nueva = { nombre: nombreCompleto, comentario, estrellas, likes: 0 };
      this.resenas.unshift(nueva);
      localStorage.setItem('resenas', JSON.stringify(this.resenas));

      this.nuevaResena = { comentario: '', correo: '', estrellas: 5 };
      this.mostrarMensajeConfirmacion();
    } else {
      alert('Correo no registrado. Debes estar registrado para dejar una reseña.');
    }
  }

  obtenerEstrellas(n: number): string {
    return '⭐️'.repeat(n);
  }

  mostrarMensajeConfirmacion(): void {
    const contenedor = this.contenedorResenas.nativeElement;
    const mensaje = this.renderer.createElement('div');
    this.renderer.addClass(mensaje, 'alert');
    this.renderer.addClass(mensaje, 'alert-success');
    this.renderer.setProperty(mensaje, 'innerText', '¡Reseña agregada con éxito!');
    this.renderer.appendChild(contenedor, mensaje);
    setTimeout(() => {
      this.renderer.removeChild(contenedor, mensaje);
    }, 3000);
  }

  // ✅ Nueva función para dar like a una reseña individual
  darLikeResena(index: number): void {
    this.resenas[index].likes++;
    localStorage.setItem('resenas', JSON.stringify(this.resenas));
  }
}