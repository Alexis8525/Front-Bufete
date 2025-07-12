import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SesionService } from './services/sesion.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'front-bufete';
  isLoading: boolean = true;

constructor(private readonly sesionService: SesionService) {}

  ngOnInit() {
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.sesionService.limpiarTemporizadores(); // <- esto cancela timers activos
  }
}
