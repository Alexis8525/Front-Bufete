import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { FormModule } from './forms.module';
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
  ],
};
