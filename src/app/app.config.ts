import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { FormModule } from './forms.module';
import { FullCalendarModule } from '@fullcalendar/angular'; // Importa FullCalendarModule

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(ReactiveFormsModule, HttpClientModule, FormModule),
    provideHttpClient(),
    FullCalendarModule,
  ],
};
