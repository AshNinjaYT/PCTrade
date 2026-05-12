import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'cataleg', 
    loadComponent: () => import('./pages/cataleg/cataleg.component').then(m => m.CatalegComponent) 
  },
  { 
    path: 'cerca', 
    loadComponent: () => import('./pages/cerca/cerca.component').then(m => m.CercaComponent) 
  },
  { 
    path: 'element/:id', 
    loadComponent: () => import('./pages/element-detail/element-detail.component').then(m => m.ElementDetailComponent) 
  },
  { 
    path: 'login', 
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'preferits', 
    loadComponent: () => import('./pages/preferits/preferits.component').then(m => m.PreferitsComponent),
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'cataleg', pathMatch: 'full' },
  { path: '**', redirectTo: 'cataleg' }
];
