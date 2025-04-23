import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';

// Merge configurations
const mergedConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideRouter(routes),
    provideHttpClient()
  ]
};

bootstrapApplication(AppComponent, mergedConfig)
  .catch(err => console.error(err));