import { Routes } from '@angular/router';
import { OrdemServicoListComponent } from './pages/ordem-servico-list/ordem-servico-list.component';
import { ClienteListComponent } from './pages/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './pages/cliente-form/cliente-form.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'ordens', pathMatch: 'full' },

  // ordens de serviço
  {
    path: 'ordens',
    loadComponent: () =>
      import('./pages/ordem-servico-list/ordem-servico-list.component')
        .then(m => m.OrdemServicoListComponent)
  },
  {
    path: 'ordens/nova',
    loadComponent: () =>
      import('./pages/ordem-servico-form/ordem-servico-form.component')
        .then(m => m.OrdemServicoFormComponent)
  },
  {
    path: 'ordens/form/:id',
    loadComponent: () =>
      import('./pages/ordem-servico-form/ordem-servico-form.component')
        .then(m => m.OrdemServicoFormComponent)
  },

     // clientes
  {
    path: 'cliente-list',
    loadComponent: () =>
      import('./pages/cliente-list/cliente-list.component')
        .then(m => m.ClienteListComponent)
  },
  {
    path: 'cliente-form',
    loadComponent: () =>
      import('./pages/cliente-form/cliente-form.component')
        .then(m => m.ClienteFormComponent)
  },
  {
    path: 'cliente-form/:id',
    loadComponent: () =>
      import('./pages/cliente-form/cliente-form.component')
        .then(m => m.ClienteFormComponent)
  },
  {
    path: 'veiculo-list',
    loadComponent: () =>
      import('./pages/veiculo-list/veiculo-list.component')
        .then(m => m.VeiculoListComponent)
  },
  {
    path: 'veiculo-form',
    loadComponent: () =>
      import('./pages/veiculo-form/veiculo-form.component')
        .then(m => m.VeiculoFormComponent)
  },
  {
    path: 'veiculo-form/:id',
    loadComponent: () =>
      import('./pages/veiculo-form/veiculo-form.component')
        .then(m => m.VeiculoFormComponent)
  }
  

];
