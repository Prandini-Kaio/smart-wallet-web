import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes, 
      withComponentInputBinding(),
      withViewTransitions()
    ),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot()
    ), provideAnimationsAsync(),
  ]
}).catch(error => console.error(error));