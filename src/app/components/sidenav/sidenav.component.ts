import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RouterModule } from '@angular/router';


interface NavItem {
  title: string;
  icon: string;
  path: string | undefined;
  subItems?: NavItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls:[
    './sidenav.component.scss'
  ],
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('sidenavAnimation', [
      state('open', style({
        width: '250px',
      })),
      state('closed', style({
        width: '60px',
      })),
      transition('open <=> closed', [
        animate('0.3s ease-in-out')
      ]),
    ]),
  ]
})
export class SidenavComponent implements OnInit {
  isClosed = true;
  isMobile = false;

  navItems: NavItem[] = [
    { title: 'Home', icon: 'fa-home', path: '/home' },
    { title: 'Contas', icon: 'fa-piggy-bank', path: '/contas/view' },
    {
      title: 'Lançamentos', icon: 'fa-money-bill-transfer', path: undefined, subItems: [
        { title: 'Lançamentos', icon: 'fa-plus', path: '/lancamentos/view' },
        { title: 'Transações', icon: 'fa-eye', path: '/transacoes/view' },
      ]
    },

    { title: 'Monitor de erros', icon: 'fa-bug', path: '/monitor-erros' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  toggleSubMenu(item: NavItem) {
    item.expanded = !item.expanded; // Alterna o estado de expansão
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
      this.isClosed = this.isMobile;
    }
  }

  toggleSidenav() {
    this.isClosed = !this.isClosed;
  }
}