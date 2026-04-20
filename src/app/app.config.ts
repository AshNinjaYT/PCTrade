import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    
    // Habilitamos HttpClient para poder hacer peticiones a APIs externas o locales (ej. json-server)
    // Esto es un requisito imprescindible de Angular 18+ para poder usar HttpClient en nuestros servicios
    provideHttpClient()
  ]
};
