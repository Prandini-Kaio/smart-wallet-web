import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Chart, registerables } from 'chart.js';
import { ErrorInterceptor } from './app/shared/error-interceptor.interceptor';

Chart.register(...registerables);

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    provideRouter(routes,
      withComponentInputBinding(),
      withViewTransitions()
    ),
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-bottom-center',
      })
    ),
    provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),
  ]
}).catch (error => console.error(error));