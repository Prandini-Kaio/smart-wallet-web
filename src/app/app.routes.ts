import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    { 
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
    },
    
    { 
        path: 'contas/view',
        loadComponent: () => import('./components/contas-list/contas-list.component').then(m => m.ContasListComponent)
    },
    
    { 
        path: 'lancamentos/add',
        loadComponent: () => import('./components/add-lancamento/add-lancamento.component').then(m => m.AddLancamentoComponent)
    },
    { 
        path: 'lancamentos/view',
        loadComponent: () => import('./components/lancamento-list/lancamento-list.component').then(m => m.LancamentoListComponent)
    },
    { 
        path: 'lancamentos/details/:id',
        loadComponent: () => import('./components/lancamento-details/lancamento-details.component').then(m => m.LancamentoDetailsComponent)
    },
    { 
        path: 'monitor-erros',
        loadComponent: () => import('./components/monitor-erros/monitor-erros.component').then(m => m.MonitorErrosComponent)
    },
];