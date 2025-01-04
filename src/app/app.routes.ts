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
        path: 'lancamentos/details/:id',
        loadComponent: () => import('./components/lancamentos/components/lancamento-details/lancamento-details.component').then(m => m.LancamentoDetailsComponent)
    },
    {
        path: 'monitor-erros',
        loadComponent: () => import('./components/monitor-erros/monitor-erros.component').then(m => m.MonitorErrosComponent)
    },
    {
        path: 'simular',
        loadComponent: () => import('./components/simular/simular.component').then(m => m.SimularComponent)
    },
    {
        path: 'tst',
        loadComponent: () => import('./components/lancamentos/components/form-lancamento/form-lancamento.component').then(m => m.FormLancamentoComponent)
    },
    {
      path: 'lancamentos',
      loadComponent: () => import('./components/lancamentos/lancamentos.component').then(m => m.LancamentosComponent)
    },
];
