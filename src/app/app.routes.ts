import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'catalogo', 
    loadComponent: () => import('./pages/cataleg/cataleg.component').then(m => m.CatalegComponent) 
  },
  { 
    path: 'busqueda', 
    loadComponent: () => import('./pages/cerca/cerca.component').then(m => m.CercaComponent) 
  },
  { 
    path: 'elemento/:id', 
    loadComponent: () => import('./pages/element-detail/element-detail.component').then(m => m.ElementDetailComponent) 
  },
  { 
    path: 'login', 
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'favoritos', 
    loadComponent: () => import('./pages/preferits/preferits.component').then(m => m.PreferitsComponent),
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: '**', redirectTo: 'catalogo' }
];
