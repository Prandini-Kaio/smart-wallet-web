import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { GoogleChartsModule } from 'angular-google-charts';
import { ToastrModule, ToastrService, provideToastr } from 'ngx-toastr';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ApiService } from './services/api.service';
import { ErrorInterceptor } from './shared/error-interceptor.interceptor';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    RouterOutlet,
    SidenavComponent,
    FormsModule,
    CommonModule,
    GoogleChartsModule,
    ToastrModule,
    HttpClientModule,
],
  providers: [
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  templateUrl: './app.component.html',
  standalone: true
})
export class AppComponent {
  sidenavItems = [
    { label: 'Home', link: '/home', icon: 'home' },
    { label: 'Add', link: '/add', icon: 'plus' },
  ];

  constructor( private router: Router ) {}

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }
}
