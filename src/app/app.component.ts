import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    RouterOutlet,
    SidenavComponent,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [ApiService],
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
