import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Necessário para animações do Angular Material
import { MatSidenavModule } from '@angular/material/sidenav'; // Importa o módulo do sidenav
import { MatToolbarModule } from '@angular/material/toolbar'; // Importa o módulo da toolbar
import { MatListModule } from '@angular/material/list'; // Para usar mat-list
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HomeComponent
  ],
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="side" opened>
        <app-sidenav></app-sidenav>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span>{{ title }}</span>
        </mat-toolbar>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    mat-sidenav-container {
      height: 100vh;
    }
    mat-sidenav {
      width: 200px;
    }
  `]
})
export class AppComponent { 
  title = "Smart Wallet"
}