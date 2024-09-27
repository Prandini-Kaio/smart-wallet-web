import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule],
  template: `
    <mat-nav-list>
      <a mat-list-item *ngFor="let item of menuItems" [routerLink]="item.route">
        <mat-icon>{{item.icon}}</mat-icon>
        <span>{{item.label}}</span>
      </a>
    </mat-nav-list>
  `,
  styles: [`
    .mat-nav-list {
      padding-top: 0;
    }
  `]
})
export class HomeComponent {
  menuItems = [
    { label: 'Home', icon: 'home', route: '/' }
  ];
}