import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/components/home/home.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter([
      { path: '', component: HomeComponent }
    ])
  ]
});