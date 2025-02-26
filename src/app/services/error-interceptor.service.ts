// import { HttpInterceptorFn } from '@angular/common/http';
// import { HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<any> => {
//   const router = inject(Router);

//   return next(req).pipe(
//     catchError((error: HttpErrorResponse) => {
//       const urlActual = router.url;
//       let mensajeError = 'Ocurrió un error inesperado.';

//       switch (error.status) {
//         case 400:
//           mensajeError = 'Error 400: Solicitud incorrecta.';
//           router.navigate(['/error/400'], { queryParams: { returnUrl: urlActual } });
//           break;
//         case 402:
//           mensajeError = 'Error 402: Se requiere pago.';
//           router.navigate(['/error/402'], { queryParams: { returnUrl: urlActual } });
//           break;
//         case 403:
//           mensajeError = 'Error 403: Acceso prohibido.';
//           router.navigate(['/error/403'], { queryParams: { returnUrl: urlActual } });
//           break;
//         default:
//           mensajeError = `Error ${error.status}: ${error.message}`;
//           router.navigate(['/error/404'], { queryParams: { returnUrl: urlActual } });
//           break;
//       }

//       return throwError(() => new Error(mensajeError));
//     })
//   );
// };
