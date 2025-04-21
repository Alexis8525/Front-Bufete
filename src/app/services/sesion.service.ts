import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private verificador: any;

  constructor(private router: Router) {}

  iniciarVerificacion() {
    if (typeof window === 'undefined') return; // Evita error en SSR

    this.verificador = setInterval(() => {
      const exp = localStorage.getItem('exp');
      if (exp && Date.now() > parseInt(exp, 10)) {
        localStorage.clear();
        this.mostrarToastExpiracion();
        this.router.navigate(['/login']);
        clearInterval(this.verificador);
      }
    }, 5000); // Cada 5 segundos
  }

  mostrarToastExpiracion() {
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-white bg-danger border-0 position-fixed bottom-0 end-0 m-4 show';
    toast.setAttribute('role', 'alert');
    toast.style.zIndex = '9999';
    toast.innerHTML = `
      <div class=\"d-flex\">
        <div class=\"toast-body\">
          ⚠️ Tu sesión ha expirado. Inicia sesión nuevamente.
        </div>
        <button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 5000); // Oculta en 5s
  }
}
