import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationHistoryService } from '../../../services/navigation-history.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  defaultReturnUrl: string = '/home';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navigationHistory: NavigationHistoryService
  ) {}

  ngOnInit(): void {
    // Opcional: Puedes capturar un returnUrl de los query params si lo necesitas
    this.route.queryParams.subscribe(params => {
      if (params['returnUrl']) {
        this.defaultReturnUrl = params['returnUrl'];
      }
    });
  }

  volver(): void {
    const previousUrl = this.navigationHistory.getPreviousUrl();
    
    // Verificamos si la URL anterior es válida y no es la misma página de error
    if (previousUrl && !previousUrl.includes('404') && previousUrl !== this.router.url) {
      // Extraemos la ruta base sin parámetros
      const baseUrl = previousUrl.split('?')[0].split('#')[0];
      
      // Navegamos a la URL anterior
      this.router.navigateByUrl(baseUrl).catch(() => {
        // Si falla, vamos a la URL por defecto
        this.router.navigate([this.defaultReturnUrl]);
      });
    } else {
      // Si no hay URL anterior válida, vamos a la página por defecto
      this.router.navigate([this.defaultReturnUrl]);
    }
  }
}
