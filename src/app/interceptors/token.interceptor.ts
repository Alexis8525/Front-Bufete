import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Solo ejecuta si estamos en el navegador
  if (typeof window === 'undefined') {
    return next(req);
  }

  const token = localStorage.getItem('token');
  const exp = localStorage.getItem('exp');

  if (exp && Date.now() > parseInt(exp, 10)) {
    alert('⚠️ Tu sesión ha expirado. Inicia sesión nuevamente.');
    localStorage.clear();
    router.navigate(['/login']);
    throw new Error('Sesión expirada');
  }

  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      })
    : req;

  return next(authReq);
};
