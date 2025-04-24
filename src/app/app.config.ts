// src/app/app.config.ts
import { ApplicationConfig }    from '@angular/core';
import { provideRouter }        from '@angular/router';
import { provideHttpClient,     // ← importa aquí
         withFetch }            from '@angular/common/http';
import { routes }               from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(        // ← cambia esta línea
      withFetch()             // habilita la API fetch para HttpClient :contentReference[oaicite:0]{index=0}
    )
  ]
};
