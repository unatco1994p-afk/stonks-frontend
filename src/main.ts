import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/auth/auth.interceptor';

async function loadRuntimeConfig() {
  try {
    const res = await fetch('/assets/config.json');
    if (!res.ok) throw new Error('no config');
    return await res.json();
  } catch (err) {
    // fallback
    return { backendUrl: 'http://localhost:8080' };
  }
}

(async () => {
  const runtimeConfig = await loadRuntimeConfig();
  // zapis na window, dostępne globalnie
  (window as any).__env = runtimeConfig;

  bootstrapApplication(AppComponent, {
    providers: [provideRouter(routes), provideHttpClient(
      withInterceptors([authInterceptor])
    )]
  }).catch(err => console.error(err));
})();

