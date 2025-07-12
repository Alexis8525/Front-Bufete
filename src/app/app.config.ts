import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';

import { routes } from './app.routes'; 
import { FullCalendarModule } from '@fullcalendar/angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Importa FullCalendarModule
// import { errorInterceptor } from './services/error-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideHttpClient(withInterceptors([errorInterceptor])),
    provideRouter(routes),
    provideClientHydration(),
     provideHttpClient(),
    FullCalendarModule, provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
  ],
};
