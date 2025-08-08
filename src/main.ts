import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

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
    providers: [provideHttpClient()]
  }).catch(err => console.error(err));
})();
